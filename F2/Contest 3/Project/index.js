 
const request = require("request");
const cheerio = require('cheerio');
var json;
function handleRequestData(err,data){
    if(err){
        console.log("Error in request");
    }
    var $ = cheerio.load(data.body); // basically creates dom  tree using html code
    // console.log(data.body);

    var repoBox = $('.Box-row');
    // var headers = repoBox.find(".lh-condensed").html();
    var headers = repoBox.children(".lh-condensed").text();

    
    console.log(headers);
    // console.log(repoBox.html());
    
}
request("https://github.com/trending",handleRequestData); // callback // coz we want handler function to be executed after request completed
// handleRequestData();