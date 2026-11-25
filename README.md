# MiniHost — site vitrine (pré-lancement)

Site statique français, prêt à être déployé avec Coolify. Il ne contient pas de panneau client, de système de paiement ni de backend. Le formulaire prépare un e-mail via `mailto:` : il ne collecte ni ne stocke les messages sur le VPS.

## 1. Configuration obligatoire

1. Ouvre `assets/config.js`.
2. Remplace `REMPLACER_PAR_VOTRE_EMAIL` par une adresse réelle que tu contrôles.
3. Complète `mentions-legales.html` avec les informations exactes de l'éditeur et de l'hébergeur. Fais vérifier ces informations avant publication commerciale.
4. Vérifie que le prix affiché, le périmètre et les services réellement disponibles correspondent à ce que tu peux fournir. Le tarif de 9,90 € est présenté comme indicatif et ne constitue pas une offre contractuelle.

## 2. Déployer dans Coolify

1. Mets ce dossier dans un dépôt GitHub.
2. Dans Coolify, crée/ouvre Project `MiniHost` et son environnement `production`.
3. `+ New` → `Public Repository` (pour ce premier test) → colle l'URL HTTPS de ton dépôt.
4. Choisis le build pack `Dockerfile`.
5. Vérifie que le port exposé est `80`.
6. Déploie.
7. Dans `Domains`, configure un domaine de test `sslip.io` généré depuis l'IP du serveur, ou ton propre domaine. Pour HTTPS avec ton domaine, le DNS doit pointer vers le VPS et les ports 80/443 doivent être accessibles.
8. Redéploie, puis vérifie `/`, `/mentions-legales.html` et `/healthz`.

La méthode `Dockerfile` utilise Nginx et le fichier `nginx/default.conf`. Si tu choisis le build pack Static à la place, Coolify fournit sa propre configuration Nginx par défaut ; le Dockerfile et `nginx/default.conf` ne seront alors pas utilisés.

## 3. Test local

Depuis le dossier du projet :

```bash
docker build -t minihost-site:local .
docker run --rm -p 8088:80 minihost-site:local
```

Ouvre `http://localhost:8088`. Vérifie aussi :

```bash
curl -i http://localhost:8088/healthz
```

## 4. Limites de cette version

- Pas de comptes clients ni d'espace client.
- Pas de paiement en ligne.
- Pas de réception automatique du formulaire (le visiteur doit envoyer le brouillon depuis son logiciel de messagerie).
- Pas de promesse de disponibilité 24/7 ni de sauvegarde quotidienne automatique.
- L'hébergement est limité aux sites statiques déjà vérifiés.

Ne donne jamais à un client l'accès administrateur Coolify, au compte root, au socket Docker ou à une clé API Coolify globale. L'administration des déploiements reste manuelle jusqu'à la conception et l'audit d'un véritable backend multi-client.
