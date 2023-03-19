import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SEND_GRID)

let msg = {
  // to: ['eric.p.miller84@gmail.com','zac@usemantel.com','zdearing@gmail.com'], // Change to your recipient
  to: ['eric.p.miller84@gmail.com'], // Change to your recipient
  from: 'eric.p.miller84@gmail.com', // Change to your verified sender
  subject: 'Mantel Customer Survey Results',
  // text: 'and easy to do anywhere, even with Node.js',
  // html: '<code>and easy to do anywhere, even with Node.js</code>',
}

const sendEmail = async (data) => {
  console.log('send email')

  try {
    msg.html = `<code>${JSON.stringify(data,null,2)}</code>`
    await sgMail.send(msg)
    console.log('Email sent')
  } catch (error) {
    console.error(error)
  }
}

export default sendEmail
