import sgMail from '@sendgrid/mail'
import yaml from 'json-to-pretty-yaml'

sgMail.setApiKey(process.env.SEND_GRID)

let msg = {
  // to: ['epmiller8464@gmail.com'], // Change to your recipient
  to: ['epmiller8464@gmail.com','zac@usemantel.com','zdearing@gmail.com'], // Change to your recipient
  // to: ['eric.p.miller84@gmail.com','zac@usemantel.com','zdearing@gmail.com'], // Change to your recipient
  // to: ['eric.p.miller84@gmail.com'], // Change to your recipient
  from: 'eric@usemantel.com', // Change to your verified sender
  subject: 'Mantel Customer Survey Results',
  // text: 'and easy to do anywhere, even with Node.js',
  // html: '<code>and easy to do anywhere, even with Node.js</code>',
}

const sendEmail = async (data) => {
  console.log('send email')

  try {
    console.log(yaml.stringify(data))
    // msg.html = `<code>${yaml.stringify(data)}</code>`
    msg.text = yaml.stringify(data)
    await sgMail.send(msg)
    console.log('Email sent')
  } catch (error) {
    console.error(error)
  }
}

export default sendEmail
