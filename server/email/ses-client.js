const AWS = require("aws-sdk");

const config = require("../config");

AWS.config.update({
	accessKeyId: config.aws.key,
	secretAccessKey: config.aws.secret,
	region: config.aws.ses.region,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

const myMail = (to, subject, message, from) => {
	const params = {
		Destination: {
			ToAddresses: [to],
		},
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: message,
				},
				/* replace Html attribute with the following if you want to send plain text emails.
                Text: {
                    Charset: "UTF-8",
                    Data: message
                }
             */
			},
			Subject: {
				Charset: "UTF-8",
				Data: subject,
			},
		},
		ReturnPath: from ? from : config.aws.ses.from.default,
		Source: from ? from : config.aws.ses.from.default,
	};

	ses.sendEmail(params, (err, data) => {
		if (err) {
			return console.log(err, err.stack);
		} else {
			console.log("Email sent.", data);
		}
	});
};

const createVerifyEmail = (email, verify_string, from) => {
	const verifyLink = `http://localhost:3000/verify/?${verify_string}`;

	const params = {
		Destination: {
			ToAddresses: ["dnbennett@hotmail.co.uk"],
		},

		Message: {
			Subject: {
				Charset: "UTF-8",
				Data: "Optimisation Wiki - Verify your email",
			},
			Body: {
				Text: {
					Charset: "UTF-8",
					Data: `Hello ${email},\n\nYour email was used to sign up to the Optimisation Wiki.  To confirm please visit ${verifyLink} `,
				},
				Html: {
					Charset: "UTF-8",
					Data: `<html>
                <head>
                    <title>Verify your email</title>
                        <style>h1{color:#f00;}</style>
                    </head>
                    <body>
                        <h1>Hello ${email},</h1>
                        <div>Your email was used to sign up to the Optimisation Wiki.
                        <br />
                        Please <a href="${verifyLink}">visit this link to confirm your email</a></div>
                        <p>Thanks,</p>
                        <p>The Optimisation Team</p>
                    </body>
                </html>`,
				},
			},
		},
		ReturnPath: from ? from : config.aws.ses.from.default,
		Source: from ? from : config.aws.ses.from.default,
	};

	ses.sendEmail(params, (err, data) => {
		if (err) {
			return console.log(err, err.stack);
		} else {
			console.log("Email sent.", data);
		}
	});
};

const resendVerifyEmail = (email, verify_string, from) => {
	const verifyLink = `http://localhost:3000/verify/?${verify_string}`;

	const params = {
		Destination: {
			ToAddresses: ["dnbennett@hotmail.co.uk"],
		},

		Message: {
			Subject: {
				Charset: "UTF-8",
				Data: "Optimisation Wiki - Verify your email",
			},
			Body: {
				Text: {
					Charset: "UTF-8",
					Data: `Hello ${email},\n\nYour email verification link is ${verifyLink} `,
				},
				Html: {
					Charset: "UTF-8",
					Data: `<html>
                <head>
                    <title>Verify your email</title>
                        <style>h1{color:#f00;}</style>
                    </head>
                    <body>
                        <h1>Hello ${email},</h1>
                        <br />
                        Your <a href="${verifyLink}">email verification link</a></div>
                        <p>Thanks,</p>
                        <p>The Optimisation Team</p>
                    </body>
                </html>`,
				},
			},
		},
		ReturnPath: from ? from : config.aws.ses.from.default,
		Source: from ? from : config.aws.ses.from.default,
	};

	ses.sendEmail(params, (err, data) => {
		if (err) {
			return console.log(err, err.stack);
		} else {
			console.log("Email sent.", data);
		}
	});
};

module.exports = { createVerifyEmail, resendVerifyEmail, myMail };
