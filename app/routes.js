var express = require('express');
var Offer = require('../app/models/offer');
var User = require('../app/models/user');
var router = express.Router();

module.exports = function(app, passport) {

	// Passport functions
	app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
			res.redirect('/#/profile');
	});

	app.post('/login', passport.authenticate('local-login'), function(req, res) {
			res.redirect('/#/profile');
	});

	app.get('/profile', isLoggedIn, function(req, res) {
			res.json({
					user: req.user
			});
	});

	app.get('/logout', function(req, res) {
			req.logout();
			res.redirect('/');
	});

	function isLoggedIn(req, res, next) {
			if(req.isAuthenticated())
					return next();

			res.json({
					error: "User not logged in"
			});
	};

	//precede all api routes with /api
	app.use('/api', router);

	// Offer routes
	var offersRoute = router.route('/offers');

	offersRoute.post(function(req, res) {
		var offer = new Offer();
		offer.driverId = req.body.driverId;
		offer.name = req.body.name;
		offer.email = req.body.email;
		offer.origin = req.body.origin;
		offer.destination = req.body.destination;
		offer.departureDate = req.body.departureDate;
		offer.departureTime = req.body.departureTime;
		offer.carType = req.body.carType;
		offer.save(function(err) {
			if(err) {
				res.status(500);
				res.send(err);
			}
			else {
				res.status(201);
				res.json({message: 'Offer created!', data: offer});
			}
		});
	});	

	offersRoute.get(function(req, res) {
		var where = {};
		if(req.query.where)
			where = eval("("+req.query.where+")");

		var sort = {};
		if(req.query.sort)
			sort = eval("("+req.query.sort+")");

		var select = {};
		if(req.query.select)
			select = eval("("+req.query.select+")");

		var limit = 100;
		if(req.query.limit)
			limit = req.query.limit;

		var count = 'false';
		if(req.query.count)
			count = req.query.count;

		Offer.find(where)
			.limit(limit)
			.sort(sort)
			.select(select)
			.exec(function(err, offers){
				if (err) {
					res.status(500);
					res.send(err);
				}
				if(count == 'true')
					res.json({message: 'OK', data: offers.length});
				else
					res.json({message: 'OK', data: offers});
			})

	});

	offersRoute.delete(function(req,res){
		if(req.body.id == 'all'){
			Offer.remove({}, function(err){
				if (err) {
					res.status(500);
					res.send(err);
				}
				res.json({message: 'All offers deleted', data: []});
			})
		}
	});

	//specific offer routes
	var offerRoute = router.route('/offers/:id');

	offerRoute.get(function(req, res) {
		Offer.findById(req.params.id, function(err, offer) {
			if(err) {
				res.status(500);
				res.send(err);
			}
			if(offer == null) {
				res.status(404);
				res.json({message: 'Not found', data: offer});
			}
			else {
				res.json({message: 'OK', data: offer});
			}
		});
	});

        offerRoute.delete(function(req, res){
                Offer.findById(req.params.id, function(err, offer){
                        if(err){
                                res.status(500);
                                res.send(err);
                        }
                        if(offer == null){
                                res.status(404);
                                res.json({message: 'Not found', data: offer});
                        }
                        else {
                                offer.remove(function(err) {
                                        if (err) {
                                                res.status(500);
                                                res.send(err);
                                        }
                                        res.json({message: 'Offer deleted', data: []});
                                });
                        }
                });
        });

	//users route

	var usersRoute = router.route('/users');
	usersRoute.get(function(req, res) {
		var where = {};
		if(req.query.where)
			where = eval("("+req.query.where+")");

		var sort = {};
		if(req.query.sort)
			sort = eval("("+req.query.sort+")");

		var select = {};
		if(req.query.select)
			select = eval("("+req.query.select+")");

		var limit = 100;
		if(req.query.limit)
			limit = req.query.limit;

		var count = 'false';
		if(req.query.count)
			count = req.query.count;

		User.find(function(err, users){
			if (err) {
				res.status(500);
				res.send(err);
			}
			if(count == 'true')
				res.json({message: 'OK', data: users.length});
			else
				res.json({message: 'OK', data: users});
		})
			.limit(limit)
			.sort(sort)
			.select(select);
	});


	//specific user routes
	var userRoute = router.route('/users/:id');

	userRoute.get(function(req, res){
		User.findById(req.params.id, function(err, user){
			if(err){
				res.status(500);
				res.send(err);
			}
			if(user == null){
				res.status(404);
				res.json({message: 'Not found', data: user});
			}
			else {
				res.json({message: 'OK', data: user});
			}
		});
	});

	userRoute.delete(function(req, res){
		User.findById(req.params.id, function(err, user){
			if(err){
				res.status(500);
				res.send(err);
			}
			if(user == null){
				res.status(404);
				res.json({message: 'Not found', data: user});
			}
			else {
				user.remove(function(err) {
					if (err) {
						res.status(500);
						res.send(err);
					}
					res.json({message: 'User deleted', data: []});
				});
			}
		});
	});

	userRoute.post(function(req, res){
		User.findById(req.params.id, function(err, user){
			if(err){
				res.status(500);
				res.send(err);
			}
			if(user == null){
				res.status(404);
				res.json({message: 'Not found', data: user});
			}
			if(req.body.name == null || req.body.email == null){
				return res.status(500).json({ message: "New email or name not provided", data: []})
			}
			else {
				user.local.name = req.body.name;
				user.local.email = req.body.email;
				user.local.description = req.body.description;
				user.local.userPicUrl = req.body.userPicUrl;
				user.local.carPicUrl = req.body.carPicUrl;
				user.save(function(err) {
					if (err) {
						res.status(500);
						res.send(err);
					}
					res.json({message: 'User edited', data: user});
				});
			}
		});
	});

	userRoute.put(function(req, res){
		User.findById(req.params.id, function(err, user){
			if(err){
				res.status(500);
				res.send(err);
			}
			if(user == null){
				res.status(404);
				res.json({message: 'Not found', data: user});
			}
			if(req.body.driveOffer == 'wipedatshit'){
				user.local.driveOffers = [];
				user.save(function(err){
					if(err){
						res.status(500);
						res.send(err);
					}
					res.json({message: 'User edited', data: user});
				});
			}
			else {
				user.local.driveOffers.push(req.body.driveOffer);
				user.save(function (err) {
					if (err) {
						res.status(500);
						res.send(err);
					}
					res.json({message: 'User edited', data: user});
				});
			}
		})
	})
};
