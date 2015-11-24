var express = require("express");
var models = require("../models/");

//Instantiating Router instance:
var router = express.Router();

//Getting our Place, Hotel, Activity, amd Restaurant models, from models/index.js:
var Place = models.Place;
var Hotel = models.Hotel;
var Activity = models.Activity;
var Restaurant = models.Restaurant;


router.get("/", function(req, res, next) {
	var allThings = {};
	Place.find({}).exec()
		.then(function(foundPlaces){
			allThings.foundPlaces = foundPlaces;
			return Hotel.find({}).exec()
		})
		.then(function(foundHotels){
			allThings.foundHotels = foundHotels;
			return Activity.find({}).exec()
		})
		.then(function(foundActivities){
			allThings.foundActivities = foundActivities;
			return Restaurant.find({}).exec()
		})
		.then(function(foundRestaurants){
			allThings.foundRestaurants = foundRestaurants;
			res.render("index", {foundHotels: allThings.foundHotels, foundRestaurants: allThings.foundRestaurants, foundActivities: allThings.foundActivities})
			// res.send(allThings)
		})
		.then(null, next)
})




module.exports = router;