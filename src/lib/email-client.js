import sgMail from '@sendgrid/mail'
// set the sendgrid api key
sgMail.setApiKey(process.env.SEND_GRID)


/***
 * sendEmail
 * @param data
 * @returns {Promise<void>}
 */
const sendEmail = async (data) => {
    console.log('send email')
    try {
        let to = []
        if(data.to && data.to.length > 0) {
            to.push(...data.to.map((e) => {
                return {email: e}
            }))
        }
        let msg = {
            // verified sendgrid email
            from: 'scout@usemantel.com',
            // set the sendgrid email template id
            template_id: data.template_id ?? 'd-265205be7ef94c3088b8bee3999e0c35',
            /// passing the email template data defined in the sendgrid ui
            /// the data should derive from the templateId
            personalizations: [{
                to: to,
                dynamic_template_data: data.body
            }]
        }
        // send the email
        await sgMail.send(msg)
        console.log('Email sent')
    } catch (error) {
        console.error(error)
    }
}

export default sendEmail
