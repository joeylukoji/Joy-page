const express = require('express');
const path = require('path');
const app = express();

// Servir les fichiers statiques depuis le répertoire racine
app.use(express.static(__dirname));

// Middleware pour les en-têtes CORS simples
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Route pour la page d'accueil et toutes les autres routes
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Gestion des erreurs serveur
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erreur serveur');
});

// Définir le port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

