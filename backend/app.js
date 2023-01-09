const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan = require('morgan');
const allow = require("allow-cors");

dotenv.config();

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();

//connexion à la base de données
mongoose.connect('mongodb+srv://' + process.env.DBUSER + ':' +process.env.DBPASSWORD + '@piquantedb.xkqs2j6.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// ajout des headers pour les requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Utilisé pour parser le corps des réponses en JSON
app.use(express.json());

// ajout de morgan pour le log des requetes HTTP
app.use(morgan('combined'));

// routes
app.use(helmet());
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);

module.exports = app;