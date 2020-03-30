const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "Mapi",
        email: "henrique.pini@bragasolucoes.com.br",
        whatsapp: "11992302610",
        city: "São Paulo",
        uf: "SP"
      });
      
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});