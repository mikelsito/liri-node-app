require('dotenv').config();

// Imports the keys file
const keys = require("./keys.js");

// Allows access to file system
var fs = require("fs");

// Loading and Initializing npm package 'twitter'
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

// Loading and Initialzing npm package 'node-spotify-api'
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Loading npm package 'request'
var request = require('request');

// Allows user input from terminal
var input = process.argv;
var command = input[2];
var parameter = "";
for (i=3;i<input.length;i++) {
	parameter += input[i] + " ";
}

// Takes user command and runs correct function
switch (command) {
	case 'my-tweets':
	myTweets();
	break;
	case 'spotify-this-song':
	spotifySong(parameter);
	break;
	case 'movie-this':
	movieThis(parameter);
	break;
	case 'do-what-it-says':
	doWhatItSays();
}

function myTweets() {
	client.get('statuses/user_timeline', {count: 20}, function(error, tweets, response) {
		if(!error) {
			console.log("");
		  	console.log("-----------------------------------\n", " ", "Most Recent Tweets:", "\n-----------------------------------");
		  	
		  	for (i = 0; i < tweets.length; i++) {
		  		console.log("");
		  		console.log(tweets[i].text);
		  		console.log("Date tweeted: " + tweets[i].created_at);
		  		console.log("");
		  	}
		}
		else {
			console.log('error occurred:', error);
		}
    });
}

function spotifySong(parameter) {
	if (parameter == "") {
		parameter = "The Sign";
	}
	spotify.search({ type: 'track', query: parameter}, function(error, data) {
  		if (!error) {
  			// Returns Top 3 Results
  			for (i=0;i<3;i++) {
	  			//First Result
	  			console.log("");
			  	console.log("-----------------------------------\n", "", parameter, "Search Result", (i+1) + "\n-----------------------------------");

				console.log("Artist: " + data.tracks.items[i].artists[0].name);
				console.log("Track: " + data.tracks.items[i].name);
				console.log("Album: " + data.tracks.items[i].album.name);
				console.log("Link to Spotify: " + data.tracks.items[i].external_urls.spotify);
				console.log("");
			}
  		}
  		else {
  			return console.log('error occurred:', error);
  		}
	});
}

function movieThis(parameter) {
	if (parameter == "") {
		parameter = "Mr. Nobody";
	}
	request('http://www.omdbapi.com/?t=' + parameter + '&apikey=trilogy', function (error, response, body) {
		  if (!error) {
		  	console.log("");
		  	console.log("-----------------------------------\n", "", parameter, "search:" + "\n-----------------------------------");

		  	console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("");
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("");
			console.log("Actors: " + JSON.parse(body).Actors);
			console.log("");

		  } else {
		  	console.log('error occured:', error);
		}
	});
}

function doWhatItSays (parameter) {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if(!error) {
			parameter = data;
			spotify.search({ type: 'track', query: parameter}, function(error, data) {
  				if (!error) {
		  			console.log("");
				  	console.log("-----------------------------------\n", "", parameter, "search:" + "\n-----------------------------------");

					console.log("Artist: " + data.tracks.items[0].artists[0].name);
					console.log("Track: " + data.tracks.items[0].name);
					console.log("Album: " + data.tracks.items[0].album.name);
					console.log("Check this song out on Spotify: " + data.tracks.items[0].external_urls.spotify);
					console.log("");
		  		}
  				else {
  					console.log('error occurred:', error);
  				}
			});
		}
		else {
			console.log('error occured:', error)
		}
	});
}

