const AWS = require("aws-sdk");

const config = require("../config");

AWS.config.update({
	accessKeyId: config.aws.key,
	secretAccessKey: config.aws.secret,
	region: config.aws.ses.region,
});

const createVerifyEmail = (email, verify_string) => {
	const verifyLink = `localhost:3000/verify/${verify_string}`;

	return {
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
                        To confirm please visit ${verifyLink}</div>
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
};

module.exports = createVerifyEmail;
