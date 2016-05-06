var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {
        passport.serializeUser(function(user, done) {
                done(null, user.id);
        });

        passport.deserializeUser(function(id, done) {
                User.findById(id, function(err, user) {
                        done(err, user);
                });
        });

        passport.use('local-signup', new LocalStrategy({
            passReqToCallback: true,
            usernameField : 'email',
            passwordField : 'password'
        },
        function(req, email, password, done) {
                User.findOne({'local.email' : email}, function(err, user) {
                        if(err) {
                            console.log(err);
                            return done(err);
                        }
                        if(user) {
                            console.log(user);
                                return done(null, false);
                        } else {
                            console.log("creating new user");
                            var newUser = new User();

                            newUser.local.email = email;
                            newUser.local.name = req.param('name');
                            if(req.param('cellphone') && req.param('cellphone') !== "") {
                                newUser.local.cellphone = req.param('cellphone');
                            } else {
                                newUser.local.cellphone = "";
                            }
                            if(req.param('description') && req.param('description') !== "") {
                                newUser.local.description = req.param('description');
                            } else {
                                newUser.local.description = "";
                            }

                            if(req.param('userPicUrl') && req.param('userPicUrl') !== "") {
                                newUser.local.userPicUrl = req.param('userPicUrl');
                            } else {
                                newUser.local.userPicUrl = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png";
                            }

                            if(req.param('carPicUrl') && req.param('carPicUrl') !== "") {
                                newUser.local.carPicUrl = req.param('carPicUrl');
                            } else {
                                newUser.local.carPicUrl = "https://image.freepik.com/free-icon/car-black-side-silhouette_318-43519.png";
                            }

                            newUser.local.password = newUser.generateHash(password);

                            newUser.save(function(err) {
                                    if(err)
                                            throw err;
                                    return done(null, newUser);
                            });
                        }

                });
        }));

        passport.use('local-login', new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password'
        },
        function(email, password, done) {
                User.findOne({'local.email': email}, function(err, user) {
                        if(err)
                                return done(err);
                        if(!user)
                                return done(null, false);
                        if(!user.validPassword(password))
                                return done(null, false);
                        return done(null, user);

                });
        }));

};

