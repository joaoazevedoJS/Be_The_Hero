const crypto = require('crypto')
const connection = require('../database/connection')

// Gerar novo ID
function genareteId() {
  const id = crypto.randomBytes(4).toString('HEX')
  return checkId(id)
}

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

module.exports = {
  async index(req, res) {
    const ongs = await connection('ongs').select("*")

    return res.json(ongs)
  },

  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body

    const id = await genareteId()

    await connection('ongs').insert({
      id,
      name: name.toUpperCase(),
      email,
      whatsapp,
      city,
      uf: uf.toUpperCase(),
    })

    return res.json({ id })
  },

  async delete(req, res) {
    const id = req.headers.authorization

    await connection('ongs').where('id', id).delete()

    return res.status(201).send();
  }
}
