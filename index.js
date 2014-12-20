var co = require('co');
var getpage = require('./getpage.js');

var SeasonParser = require('./seasons_parser.js');
var scriptIndex = "http://www.seinology.com/scripts-english.shtml";

var mongorito = require('mongorito');
var Model = mongorito.Model;
var Season = require('./Season.js')(Model);
var EpisodeFactory = require('./SeasonFactory.js')(getpage, co);

Mongorito.connect('localhost/seinfeld');

co(function * (){
    var index = yield getpage(scriptIndex);
    var content = index.body;
    var Parser = new SeasonParser(content);

    Parser.parse(function(data){
        console.log(data);
    });
});
