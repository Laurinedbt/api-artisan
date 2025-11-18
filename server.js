const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion BDD

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,    
    user: process.env.MYSQLUSER,       
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
});

db.connect((err) => {
    if (err) {
        console.error('Erreur connexion MySQL:', err);
    } else {
        console.log('Connecté à la base MySQL');
    }
});

// Import et configuration des routes
const artisansRoutes = require('./src/routes/artisans');
artisansRoutes.setDb(db);
app.use('/api/artisans', artisansRoutes.router);

// Démarrage serveur

app.listen(port, () => {
    console.log('Server app listening on port' + port);
});