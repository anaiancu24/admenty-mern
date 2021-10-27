const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

// Item Model
const User = require('../../models/User');
var app = express()
// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" })
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "This user already exists" })

            const newUser = new User({
                name,
                email,
                password,
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600, },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )

                        })
                })
            })

            // Nodemailer stuff
            // const output = `
            // <h3>Hey, ${name}</h3>
            // <p>Thanks for joining Admenty! Your gratefulness journey starts today :) </p>
            // <br>
            // <p>Your friends from Admenty</p>
            // `

            // create reusable transporter object using the default SMTP transport
            // let transporter = nodemailer.createTransport({
            //     host: "smtpout.secureserver.net",
            //     port: 587,
            //     secureConnection: false,
            //     secure: false,
            //     requireTLS: true,
            //     auth: {
            //     user: "contact@admenty.com",
            //     pass: "xxxxxx"
            //     },
            //     tls: {
            //     rejectUnauthorized: false
            //     }
            // });
          
            // send mail with defined transport object
            // let info = transporter.sendMail({
            //   from: '"Admenty" <contact@admenty.com>', // sender address
            //   to: email, // list of receivers
            //   subject: "Welcome to Admenty", // Subject line
            //   text: "Hello world?", // plain text body
            //   html: output, // html body
            // });
          
            // console.log("Message sent: %s", info.messageId);
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

            // Hubspot


                // var options = { method: 'POST',
                // url: 'https://api.hubapi.com/contacts/v1/contact/',
                // qs: { hapikey: 'eu1-3c69-fa73-4ef2-a3ee-e895d08331aa' },
                // headers: 
                // { 
                //     'Content-Type': 'application/json' },
                // body: 
                // { properties: 
                //     [ { property: 'email', value: newUser.email },
                //         { property: 'firstname', value: newUser.name }, ] },
                // json: true };

                // request(options, function (error, response, body) {
                // if (error) throw new Error(error);

                // console.log(body);
                // });

                // app.post('https://api.hubapi.com/contacts/v1/contact/', {hapikey: 'eu1-3c69-fa73-4ef2-a3ee-e895d08331aa'}, function (req, res) {
                //     res.send('POST request to homepage')
                // })
        })
})



module.exports = router;