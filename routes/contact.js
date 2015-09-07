var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Agency' });
});

router.post('/send', function(req, res, next){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your@gmail.com',
      pass: 'yourpassword'
    }
  });
  var mainOptions = {
    from: 'Michael Walker <your@gmail.com>',
    to: 'recipient@email.com',
    subject: 'Website Submission',
    text: 'You have a new submission with the following details...Name: '+req.body.name+ ' Email: '+req.body.email+ ' Message: '+req.body.message+ '',
    html: '<p>You have a new submission with the following details..</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
  };
  transporter.sendMail(mainOptions, function(error, info){
    if(error){
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message Sent: '+info.response);
      res.redirect('/');
    }
  });
});

module.exports = router;
