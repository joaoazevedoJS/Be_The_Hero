const crypto = require('crypto')
const connection = require('../database/connection')

async function checkId(id) {
  // Vai retornar verdadeiro se o id existir
  const ongWithIdExist = await connection('ongs')
    .select('*')
    .where({ 'id': id })
    .first();

  while (ongWithIdExist) {
    id = genareteId();
  }

  return id
}

function generateUniqueId() {
  const id = crypto.randomBytes(4).toString('HEX')

  return checkId(id)
}

module.exports = generateUniqueId
