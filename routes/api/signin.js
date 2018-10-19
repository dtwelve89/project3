const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
    //   app.get('/api/Users', (req, res, next) => {
    //     User.find()
    //       .exec()
    //       .then((User) => res.json(User))
    //       .catch((err) => next(err));
    //   });

    //   app.post('/api/Users', function (req, res, next) {
    //     const User = new User();

    //     User.save()
    //       .then(() => res.json(User))
    //       .catch((err) => next(err));
    //   });

    /*
    Sign up Page and methods
    */
    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const {
            firstName,
            lastName,
            password
        } = body;
        let {
            email
        } = body;

        if (!firstName) {  // if first name is not null
            return res.send({
                success: false,
                message: 'Error: First name cannot be blank.'
            });
        }
        if (!lastName) {  // if last name is not null
            return res.send({
                success: false,
                message: 'Error: Last name cannot be blank.'
            });
        }
        if (!email) {  // if email is not null
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!password) {  // if password is not null
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }

        console.log('here');
        email = email.toLowerCase();

        //Steps for sign up:
        //1. Verify email doesn't exist
        //2. Save
        User.find({
            email: email
        }, (err, previousUser) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error.'
                });
            } else if (previousUser.length > 0) {

                return res.send({
                    success: true,
                    message: 'Signed up!'
                });
            }

            const newUser = new User();

            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server Error.'
                    });
                }
                res.send({
                    success: true,
                    message: 'Signed up!'
                });
            });
        });

    });

    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;
        const {
            password
        } = body;
        let {
            email
        } = body;

        if (!email) {  // if email is not null
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!password) {  
            // if password is null
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }

        email = email.toLowerCase();

//steps to validate User

        User.find({
            email: email
        }, (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error.'
                });
            }
            if (users.length != 1) { //insures finding one user or none
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            }

            const user = users[0];
            console.log(users[0]);
            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Password'
                });
            }

            //if everything is fine create User Session
            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: server error'
                    });
                }

//using doc_id in current session to generate user token
                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id            //points to user id see postman
                });
            });
        });

    });
    
    app.get('/api/account/verify', (req, res, next) => {
        // Get the token
      
        const { query } = req;
        const { token } = query;
        //?token=test
        //verify the token is unique and not deleted

        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }

            if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            } else {
                return res.send({
                    success: true,
                    message: "Verified Successfully"
                })
            }
        });
    });

    app.get('/api/account/logout', (req, res, next) => {
           // Get the token
      
           const { query } = req;
           const { token } = query;
           //?token=test
           //verify the token is unique and not deleted
   
           UserSession.findOneAndUpdate({
               _id: token,
               isDeleted: false
           }, {
                $set: {
                    isDeleted:true
                }
           }, null, (err, sessions) => {
               if (err) {
                   return res.send({
                       success: false,
                       message: 'Error: Server Error'
                   });
               }
   
               return res.send({
                       success: true,
                       message: "Verified Successfully"
                   })
               
           });
    });
};