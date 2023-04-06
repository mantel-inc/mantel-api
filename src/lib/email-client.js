import sgMail from '@sendgrid/mail'
import yaml from 'json-to-pretty-yaml'

sgMail.setApiKey(process.env.SEND_GRID)

let msg = {
    // to: ['epmiller8464@gmail.com'], // Change to your recipient
    // to: ['epmiller8464@gmail.com', 'zac@usemantel.com'], // Change to your recipient
    // to: ['eric.p.miller84@gmail.com','zac@usemantel.com','zdearing@gmail.com'], // Change to your recipient
    // to: ['eric.p.miller84@gmail.com'], // Change to your recipient
    from: 'eric@usemantel.com', // Change to your verified sender
    // subject: 'Mantel Customer Survey Results',
    // text: 'and easy to do anywhere, even with Node.js',
    // html: '<code>and easy to do anywhere, even with Node.js</code>',
}

const sendEmail = async (data) => {
    console.log('send email')
    // const {to, body} = data
    try {
        // let to = [{email: 'epmiller8464@gmail.com'}, {email: 'zac@usemantel.com'}, {email: 'zdearing@gmail.com'}]
        let to = []
        
        if(data.to && data.to.length > 0) {
            to.push(...data.to.map((e) => {
                return {email: e}
            }))
        }
        // console.log(yaml.stringify(body))
        msg.template_id = data.template_id ?? 'd-265205be7ef94c3088b8bee3999e0c35'
        msg.personalizations = [{
            to: to,
            dynamic_template_data: data.body
        }]
        
        await sgMail.send(msg)
        console.log('Email sent')
    } catch (error) {
        console.error(error)
    }
}

export default sendEmail
