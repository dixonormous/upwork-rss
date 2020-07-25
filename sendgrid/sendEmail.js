const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = () => {
  const email = {
    to: 'john_snow@coldmail.com',
    from: 'alexdixon.dev92@gmail.com',
    subject: 'You favorited a post!',
    text: 'Now the Targaryans will be pleased',
  };
  return sgMail.send(email)
  .then(ignore => {  })
  .catch(e => {  })
};

module.exports = { sendEmail }
