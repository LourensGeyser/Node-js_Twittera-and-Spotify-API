//instructions
/*
  - run the program through the terminal because input is required
  - enter the number that represents the menu item you pick
  - if a menu item is picked 1 can be entered to select a default option
*/

function twitter(name){
//const { count } = require('console');
//here we get the twitter api
var Twitter = require('twitter');

// provide all the nececary key for the api to function
var client = new Twitter({
  consumer_key: 'awYBGkikISP9tL08IBRZsQhLL',
  consumer_secret: 'DE8ALX0YuvngYLGvHlPXzHmgdEFQKhTmAeBgBTratTmOCvhPCF',
  access_token_key: '3424748296-SeCEojG4prqZogPPS0IPrZFOo1aMootP0oF2cqP',
  access_token_secret: 'qaQRkzreeLygu61NX4yjpBus1O2aD6Vb0qZGWfhFudW30'
});

//create a parameter that containt the user we are searching
// for and the amount record we want to retriev from that user
var params ={
  screen_name: name,
  count : 20
};
//here we call the twiiter get function which retrieves a array of tweets
client.get('statuses/user_timeline',params,function(error, tweets, response) {
  //error checking 
  if (!error)
  {
    //place the array of tweets into a new placeholder array
    const data = tweets.map(tweet=>tweet.text);
    var i=0
    //iterate through the array and print each tweet
    for( var tweet of data)
     {
     i+=1;
     console.log('Tweet ',i,':',tweet,'\n');
     }
  }
  else{
    console.log(error)
  }
 
 });
}
function spotify(endnote){
  //acquire access for node-spotify-api folder
  var Spotify = require('node-spotify-api');
  //provide critical information for the api to work that include developer id and secret id
  var spotify = new Spotify({
    id: '88b2ee34c6734f51a36d05a600c51993',
    secret: '74975b645b6d414b8ca4ba7be5175119'
  });
  //perform a search request based on spotify endpoint to indicate search type and search query
  //test endnote 'https://api.spotify.com/v1/artists/0gxyHStUsqpMadRV0Di1Qt'
  spotify
    .request(endnote)
    .then(function(data) {
      console.log('spotify output: ',data); 
    })
    .catch(function(error) {
      console.error('Error occurred: ' + error); 
    });
}

//import readline module from node that allows me to gather user information 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

//menu
readline.question('Please choose a number between 1 and 3 :\n(1) Print latest tweets\n(2) Perform a Spotify look-up for a song\n(3) Read a query from a text file\n', input => {
  //loop of if statement to get users choses option and then close the readline function 
  if (input == '1')
  {
    readline.question("\n(1) for default value\nOR\nEnter name of twitter user to search\n",option=>{
      //if user choses 1 resort to default value in this case it is the twitter account of Randy orton 14 time wwe heavyweight champion XDDD
       if(option == '1'){
         twitter('RandyOrton');
         readline.close();
       }
       //if the text is anything else the text will be sent to the api and then seaches for the provided account if it exists 
       else{
         twitter(option);
         readline.close();
       }
      });
  }
  else if(input == '2')
  {
    //if user choses 1 resort to default value in this case is the artist ricky ashly 
    readline.question("\N(1) for default value\nOR\nEnter a full spotify endnote addres\n",option=>{
      if(option == '1'){
        spotify('https://api.spotify.com/v1/artists/0gxyHStUsqpMadRV0Di1Qt');
        readline.close();
      }
      //if user provided anything else it will create a search query for the input(not that it must be a spotify endnote look at the default value as an example)
      else{
        spotify(option);
        readline.close();
      }
     });
  }
  else if(input == '3')
  {
    //require node js module to read from files 
    var fs = require('fs');
    // error handeling
    try {  
      //read from file
      var data = fs.readFileSync('random.txt', 'utf8');
      //split data retrieved from file into an list of 2 values
      data=data.split(/\r?\n/)
      console.log('\nThe following text is extracted : ');
      // insert values gained from txt file into api's
      console.log('Twitter : ',data[0]);
      console.log('Spotify : ',data[1]);
      twitter(data[0]);
      spotify(data[1]);
    }
     catch(e) {
      console.log('Error:', e.stack);
    }
    //close terminal
    readline.close(); 
  }
 
});



//readline.close(); 
