var co = require('co');
var getpage = require('./getpage.js');
var SeasonParser = require('./seasons_parser.js');
var scriptIndex = "http://www.seinology.com/scripts-english.shtml";

co(function * (){
    var index = yield getpage(scriptIndex);
    var content = index.body;
    var Parser = new SeasonParser(content);

    Parser.parse(function(data){
        console.log(data);
    });
});
