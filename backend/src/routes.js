// Arquivo de Rotas do nosso programa !
const express = require('express')
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// SESSION HANDLER
routes.post('/sessions', SessionController.create)

// ONGS HANDLER
routes.get('/ongs', OngController.index); // Listar todas
routes.post('/ongs', OngController.create); // Criar

// PROFILE HANDLER
routes.get('/profile', ProfileController.index); // Listar caso da ong


// INCIDENTS HANDLER
routes.get('/incidents', IncidentController.index); // Listar
routes.post('/incidents', IncidentController.create); // Criar
routes.delete('/incidents/:id', IncidentController.delete) // Deletar

module.exports = routes; // Serve para exportar o arquivo de rotas para o index.js! comment there