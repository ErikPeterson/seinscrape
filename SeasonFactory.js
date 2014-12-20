var cheerio = require('cheerio');

module.exports = function(getpage, co){
'use strict';

    return co(function * (seasons){
        for(let i = 0, len = seasons.length; i<len; i++){
            let season = seasons[i];
            let episodes = season.episodes;

            for(let ii = 0, llen = episodes.length; ii<llen){
                let episode = episodes[ii];
                let script_page = yield getpage(episode.href);
                let $ = cheerio.load(script_page);
            }
        }
    }
}