const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const Hubspot = require('hubspot')

// Item Model
const User = require('../../models/User');

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', async (req, res) => {
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


            // Hubspot
            //             <script charset="utf-8" type="text/javascript" src="//js-eu1.hsforms.net/forms/shell.js"></script>
            // <script>
            //   hbspt.forms.create({
            // 	region: "eu1",
            // 	portalId: "25216019",
            // 	formId: "5f7f04cc-d8ce-452f-a25f-91afb7cd5cd2"
            // });
            // </script>
  

               

        })


          const portalId = "25216019"
          const formId = "5f7f04cc-d8ce-452f-a25f-91afb7cd5cd2"
          var data = {
            "fields": [
              {
                "name": "email",
                "value": email
              },
              {
                "name": "firstname",
                "value": name
              }
            ],

          }
      
          var final_data = JSON.stringify(data)

        try{
            const hubspot = new Hubspot();
            const hubspotContact = await hubspot.forms.submit(portalId, formId, data);
        }
        catch (err){
            console.log(err)
        }

})



module.exports = router;