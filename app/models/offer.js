// Load required packages
var mongoose = require('mongoose');

// Define our offer schema
var OfferSchema   = new mongoose.Schema({
    driverId: String,
    name: String,
    email: String,
    origin: String,
    destination: String,
    departureDate: Date,
    departureTime: String,
    carType: String
});

// Export the Mongoose model
module.exports = mongoose.model('Offer', OfferSchema);
