const connection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { id } = req.body; // Recebe o ID da ong
    const ong = await connection('ongs') // Conecta ao banco
      .where('id', id) // Tenta encontrar se a ong existe
      .select('name') // Pega o nome 
      .first(); // Retornando uma única ong

    if (!ong) {
      return res.status(400).json({ error: "No ONG found with this ID" });
    }

    return res.json(ong);
  }
}