# liri-node-app

![Alt text](images/terminal.png?raw=true "Title")

This Application allows the user to interact with the Spotify, Twitter, and OMDB APIs
from the computer terminal using node. 

After Downloading:
	- Run npm install to get dependencies
	- Create a .env file to hold your API keys
	- Add required API keys in this format:

![Alt text](images/keys.png?raw=true "keys")

The current commands are as follows:

	- node liri.js my-tweets
		- this allows the user to print to the console their 20 most recent tweets
	
	- node liri.js spotify-this-song <song name>
		- This allows the user to call the Spotify API to return the top 3 results 
		  of that search. It will return the artist, track name, album, and a link
		  to spotify.
		- If no song is added, it will default to "The Sign".

	- node liri.js movie-this <movie title>
		- This allows the user to call the OMDB API to return title, year released,
		  imdb rating, Rotten Tomatoes score, country of production, language, plot,
		  and actors in the film.
		- If no movie title is added, it will default to "Mr. Nobody".

	-node liri.js do-what-it-says
		- This uses the node fs command to acces the data of the random.txt file,
		  and runs the spotify-this-song function on it's contents. This is simply to
		  demonstrate the functionality of the application. Feel free to change the
		  text in random.txt.