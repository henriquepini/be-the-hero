const crypto = require("crypto"); // Criptografia pra gerar o ID

module.exports =  function generateUniqueId() {
  return crypto.randomBytes(4).toString('HEX');
}