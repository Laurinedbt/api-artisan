const express = require('express');
const router = express.Router();

// Fonction pour accéder à la connexion db
let db;

const setDb = (database) => {
    db = database;
};

// Route pour récupérer toutes les catégories
router.get('/categories', (req, res) => {
    const query = 'SELECT DISTINCT `catégorie` AS categorie FROM data ORDER BY `catégorie`';
    
    db.query(query, (error, results) => {
        if (error) {
            console.error('Erreur requête catégories:', error);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results); // return [{ categorie: "Bâtiment" }, ...]
    });
});

// Route pour récupérer les artisans par catégorie
router.get('/categorie/:categorie', (req, res) => {
    const categorie = req.params.categorie;
    const query = 'SELECT * FROM data WHERE `catégorie` = ?';
    
    db.query(query, [categorie], (error, results) => {
        if (error) {
            console.error('Erreur requête artisans:', error);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
});

// Route pour récupérer tous les artisans
router.get('/', (req, res) => {
    const query = 'SELECT * FROM data';
    
    db.query(query, (error, results) => {
        if (error) {
            console.error('Erreur requête artisans:', error);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
});

// Route pour récupérer les artisans "Top"
router.get('/top', (req, res) => {
    const query = 'SELECT * FROM data WHERE top = true ORDER BY note DESC LIMIT 3';
    
    db.query(query, (error, results) => {
        if (error) {
            console.error('Erreur requête artisans top:', error);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        res.json(results);
    });
});

// Route pour récupérer un artisan par ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM data WHERE id = ?';
    
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Erreur requête artisan:', error);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Artisan non trouvé' });
        }
        res.json(results[0]);
    });
});

module.exports = { router, setDb };
