const connection = require('../database/connection')

async function getIncidentsOfOng(id) {
  return await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first()
}

module.exports = getIncidentsOfOng
