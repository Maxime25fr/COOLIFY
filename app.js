(() => {
  'use strict';

  const menuButton = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const year = document.getElementById('year');
  const emailLabel = document.getElementById('contact-email-label');

  if (year) year.textContent = new Date().getFullYear();

  const configuredEmail = typeof MINHOST_CONTACT_EMAIL === 'string'
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(MINHOST_CONTACT_EMAIL)
    && !MINHOST_CONTACT_EMAIL.includes('REMPLACER');

  if (emailLabel) {
    emailLabel.textContent = configuredEmail
      ? MINHOST_CONTACT_EMAIL
      : 'Adresse de contact à configurer dans assets/config.js';
  }

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }));
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      if (!configuredEmail) {
        status.textContent = 'Configure d’abord l’adresse e-mail dans assets/config.js, puis redéploie le site.';
        status.className = 'form-status error';
        return;
      }

      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const replyTo = String(data.get('email') || '').trim();
      const project = String(data.get('project') || '').trim();
      const message = String(data.get('message') || '').trim();
      const subject = encodeURIComponent(`Demande MiniHost — ${project}`);
      const body = encodeURIComponent(
        `Nom : ${name}\nE-mail : ${replyTo}\nProjet : ${project}\n\nMessage :\n${message}\n\nEnvoyé depuis le formulaire MiniHost.`
      );
      status.textContent = 'Votre application de messagerie va s’ouvrir. Vérifiez le message puis envoyez-le.';
      status.className = 'form-status success';
      window.location.href = `mailto:${MINHOST_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
