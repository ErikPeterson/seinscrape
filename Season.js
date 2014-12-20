module.exports = function(Model){
    var Season = Model.extend({
        collection: 'seasons'
    })

    Season.Episode = Season.extend({collection: 'episodes'});

    return Season;
};