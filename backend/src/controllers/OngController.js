const generateUID = require('../utils/generateUniqueId');
const connection = require('../database/connection');


module.exports = {
  async index(req, res) {
    const ongs = await connection('ongs').select('*'); // seleciona todos os registros ret json

    return res.json(ongs);
  },

  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = generateUID();

    await connection('ongs').insert({ // *await e async *Espera o código ser executado antes de continuar
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.json({ id });
  }
}