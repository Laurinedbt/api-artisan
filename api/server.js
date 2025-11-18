const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion BDD

const db = mysql.createConnection({
    host: process.env.DB_HOST,    
    user: process.env.DB_USER,       
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error('Erreur connexion MySQL:', err);
    } else {
        console.log('Connecté à la base MySQL');
    }
});

// Import et configuration des routes
const artisansRoutes = require('../src/routes/artisans');
artisansRoutes.setDb(db);
app.use('/api/artisans', artisansRoutes.router);

// Démarrage serveur

app.listen(port, () => {
    console.log('Server app listening on port' + port);
});