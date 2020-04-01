const nodemailer = require('nodemailer')

const { host, port, auth, auth: { user } } = require('../config/emailConfig.json')

const transport = nodemailer.createTransport({
  host,
  port,
  auth
})

async function sendMessageToEmail(name, email, id) {
  const sendMessage = {
    from: user,
    to: email,
    subject: `Olá ${name}!`,
    text: `Seu id para login é: ${id}, por favor guarde bem esse codigo! \n\nEnviado em: ${new Date()}`
  }

  await transport.sendMail(sendMessage)
}

module.exports = sendMessageToEmail
