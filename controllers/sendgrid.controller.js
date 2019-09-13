var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var config = require('../config/config');

var sendUserMail = function(to, from, subject, done){
    var smtpTransport = nodemailer.createTransport(sgTransport(options))
    //var emailTemplate = confirmTemplate.replace();
    var confirmTemplate = fs.readFileSync(path.join(__dirname, '../', config.baseTemplatesUrl, config.confirmTemplate), 'utf8');
    var options = {
        auth: {
            api_key: process.env.SENDGRID_API_KEY
        } 
    }

    var mailOptions = {
        to: to,
        from: from || 'team@sprintstudio.co',
        subject: subject || 'Conferma registrazione',
        html: confirmTemplate
    }

	smtpTransport.sendMail(mailOptions, function(err) {
		if(err){
			done(err)
		} else {
			done(undefined, { message: "An email has been sent to " + user.email + " with further instruction" })
		}

	})
}

module.exports = {
	sendUserMail: sendUserMail
}
