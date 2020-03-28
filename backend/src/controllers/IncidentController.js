const connection = require('../database/connection'); // conn controller

module.exports = {
  // Listar
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('incidents').count(); // retorna o primeiro resultado, evita um array

    console.log(count);

    const incidents = await connection('incidents') // Faz paginação com os casos
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    res.header('X-Total-Count', count['count(*)']); // Envia o total de casos como header

    return res.json(incidents);
  },
  
  // Criar
  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] /* ! */ = await connection('incidents').insert({ // chama a conexão ao banco
      title,
      description,
      value,
      ong_id
    });

    return res.json({ id });
  },

  // Deletar
  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await connection('incidents') // Conecta
      .where('id', id) // Encontra o registro do caso
      .select('ong_id') // Verifica se pertence a ong, selecionando-a
      .first(); // Retorna o único e primeiro registro

      if (incident.ong_id != ong_id){
        return res.status(401).json({ error: 'Operation not permitted.' }); // STATUS DE NÃO AUTORIZADO
      }

      await connection('incidents').where('id', id).delete();

      return res.status(204).send(); // RESPOSTA COM SUCESSO MAS SEM CONTEÚDO RETORNÁVEL
  }
}

// ! esse ID é pq como ele retorna um array, se tu armazenar o primeiro valor na variável ele já retorna