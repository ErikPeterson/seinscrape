'use strict';

var cheerio = require('cheerio');

var seasons = (function(){
    var arr = [];
    for(var i=0; i<9; i++){

        let ordinal = i+1;
        let year = 1989 + i;
        let episodes = [];

        arr.push({
            ordinal: ordinal,
            year: year,
            episodes: episodes
        });
    }

    return arr;
}())
var $;

var SeasonsParser = function(body){
    $ = cheerio.load(body);
    this.seasons = seasons;
};

SeasonsParser.prototype.parse = function(cb){
    var reg=/^\/?scripts\/script\-\d+\.shtml$/;

    var episodeLinks =  $('a').filter(function(i, el){
        return reg.test($(el).attr('href'));
    });

    this.episodes = this.parseEpisodes(episodeLinks);
    var season_counter= 0;
    var table = this.episodes[0].$el.closest('table');
    
    Array.prototype.forEach.call(
        this.episodes, function(episode, i, episodes){
            var nextAnchor = (season_counter === 8) ? undefined : 'a[name="0' + (season_counter+2) + '"]';
           
           if(nextAnchor){
                let tr = episode.$el.closest('tr');
                let anchortr = $(nextAnchor).closest('tr');

                if(table.children().index(tr) > table.children().index(anchortr) ) season_counter++;
            } 

            delete episode.$el;
            episode.number_in_season = this.seasons[season_counter].episodes.length + 1;
            this.seasons[season_counter].episodes.push(episode);
        }, this);

    return cb ? cb(this.seasons) : undefined;
};

SeasonsParser.prototype.parseEpisodes = function(links){
    return links.map(function(i, link){
        var $link =  $(link);
        var href = 'http://seinology.com' + '/' + $link.attr('href').replace(/^\//, '');
        var episode_number = i + 1;
        var title = $link.text().replace(/^\d+\-/,'');
        var transcriber = $link.closest('td').next('td').next('td').text();

        return {href: href, title: title, ordinal_number: episode_number, transcriber: transcriber, $el: $link};
    });
};

module.exports = SeasonsParser;