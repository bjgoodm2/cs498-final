var Offer = require('../app/models/offer');

module.exports = function(app, passport) {

        // Passport functions
        app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
                res.redirect('/profile.html');
        });

        app.post('/login', passport.authenticate('local-login'), function(req, res) {
                res.redirect('/profile.html');
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

        // Offer routes
	app.post('/offers', function(req, res) {
		var offer = new Offer();
		offer.driverId = req.body.driverId;
		offer.name = req.body.name;
		offer.email = req.body.email;
		offer.origin = req.body.origin;
		offer.destination = req.body.destination;
		offer.departureDate = req.body.departureDate;
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

	app.get('/offers', function(req, res) {
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

     		Offer.find(function(err, offers){
           		if (err) {
           			res.status(500);
           			res.send(err);
           		}
           		if(count == 'true')
           			res.json({message: 'OK', data: offers.length});
           		else
           			res.json({message: 'OK', data: offers});
           	})
     		.limit(limit)
     		.sort(sort)
     		.select(select);
     	});

        app.get('/offers/:id', function(req, res) {
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
				

};
