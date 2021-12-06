const transporter = require("../configs/mail.js");
module.exports=(({from,to,subject,text,html})=>{
const message = {
    from: from,
    to:to,
    subject: subject,
    text: text,
    html: html,
    attachments: [
    {   // encoded string as an attachment
        filename: 'text1.txt',
        content: 'aGVsbG8gd29ybGQh',
        encoding: 'base64'
    }]
  };//console.log(CURRENT_ENVIRONMENT, SMTP_USERNAME, SMTP_PASSWORD)
  transporter.sendMail(message);
})