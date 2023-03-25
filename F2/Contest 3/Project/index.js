 
const request = require("request");
const cheerio = require('cheerio');
var myJson={};
myJson["repositories"]=[];
function handleRequestData(err,data){
    if(err){
        console.log("Error in request");
    }
    var $ = cheerio.load(data.body); // basically creates dom  tree using html code
    // console.log(data.body);

    var body = $("body");
    var repoBox = body.find('.Box-row');
    for(var i=1;i<repoBox.length;i++){
        
//    var i=0;
    
    // var headers = repoBox.find(".lh-condensed").html();
    // var headers = repoBox.find(".lh-condensed").text();//text
    var headers = repoBox.eq(i).children("h1").children("a").text();
    var desc = repoBox.eq(i).children("p").text();
    var stars = repoBox.eq(i).children("div").eq(1).children("a").first().text();//attr({class:"octicon-star"}) //sponsor
    var forks = repoBox.eq(i).children("div").eq(1).children("a").eq(1).text(); // eq for nth child
    var url = repoBox.eq(i).children("h1").children("a").attr("href");


    // var languageSpan = repoBox.eq(i).children(".color-fg-muted").html();
    // var languages = languageSpan.children(".repo-language-color").html();
    var language = repoBox.eq(i).children("div").eq(1).find("span").children("span").eq(1).text(); // eq for nth child
    // var languages = $('span[itemprop="programmingLanguage"]');
    // var languages = $(languageSpan).find("span").attr({itemprop:"programmingLanguage"}).text(); //find give you one object where children gives all

    var obj={
        "title": headers.replace(/\s+/g,' ').trim(),
        "description":desc.replace(/\s+/g,' ').trim(),
        "url":url.replace(/\s+/g,' ').trim(),
        "stars":stars.replace(/\s+/g,' ').trim(),
        "forks":forks.replace(/\s+/g,' ').trim(),
        "language":language.replace(/\s+/g,' ').trim()
         };
         myJson["repositories"].push(obj);
    }
    console.log(myJson);
    

    
    // console.log(repoBox);
    // console.log(repoBox.length);
    
}
request("https://github.com/trending",handleRequestData); // callback // coz we want handler function to be executed after request completed
// handleRequestData();
