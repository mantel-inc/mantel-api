import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SEND_GRID)

const msg = {
  to: ['epmiller8464@gmail.com','zac@usemantel.com','zdearing@gmail.com'], // Change to your recipient
  from: 'epmiller8464@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

const sendEmail = async () => {
  console.log('send email')
  try {
    await sgMail.send(msg)
    console.log('Email sent')
  } catch (error) {
    console.error(error)
  }
}

export default sendEmail
