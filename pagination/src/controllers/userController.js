const express = require('express');

const sendmail = require('../utils/sendmail');
const User = require("../models/user.model")
const router = express.Router();
router.post("", async function (req, res) {
    const user=await User.create(req.body)
    sendmail ( {
        from: "sender@se.com",
        to: user.email,
        subject: "Message title",
        text: ` Welcome to ABC system ${user.first_name} ${user.last_name}`,
        html: `<p> Welcome to ABC system ${user.first_name} ${user.last_name}</p>`
      });
      const maillist=["receiver@senr.com","receiver@senr.com","receiver@senr.com","receiver@senr.com","receiver@senr.com"]
      sendmail ( {
         from: "sender@se.com",
         to: maillist,
         subject: `${user.first_name} ${user.last_name} has registered with us,`,
         text: `Please welcome ${user.first_name} ${user.last_name}`,
         html: "<p>Hello mukesh</p>"
       });    return res.send({user});
    }),

router.get("", async function (req, res) {
   
const page = +req.query.page||1;
const size = +req.query.size||10;
const offset=(page-1)*size;
const total=await User.find().countDocuments().lean().exec()
const pageCount=Math.ceil(total/size);


 const users = await User.find().skip(offset).limit(size).lean().exec();
 const maillist=["receiver@senr.com","receiver@senr.com","receiver@senr.com","receiver@senr.com","receiver@senr.com"]
 sendmail ( {
    from: "sender@se.com",
    to: maillist,
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>Hello mukesh</p>"
  });//console.log(CURRENT_ENVIRONMENT, SMTP_USERNAME, SMTP_PASSWORD)
return res.send({users,pageCount});
});

module.exports = router;