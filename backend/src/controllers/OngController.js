const generateUniqueId = require('../utils/generateUniqueId')
const sendEmail = require('../utils/sendMail')
const connection = require('../database/connection')

module.exports = {
  async index(req, res) {
    const ongs = await connection('ongs').select("*")

    return res.json(ongs)
  },

  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body

    const id = await generateUniqueId()

    await connection('ongs').insert({
      id,
      name: name.toUpperCase(),
      email,
      whatsapp,
      city,
      uf: uf.toUpperCase(),
    })

    await sendEmail(name, email, id)

    return res.json({ id })
  }
}
