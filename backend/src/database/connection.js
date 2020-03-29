const knex = require('knex');
const configuration = require("../../knexfile");

const connection = knex(configuration.development) // Chama a config development do arquivo

module.exports = connection; // exporta o módulo de conexão