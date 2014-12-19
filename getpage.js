var request = require('co-request');

module.exports = function * (url_or_hash){
    var result = yield request(url_or_hash);

    return result;
};