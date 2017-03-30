import Ajax from './ajax.js'

export default {
    getMarketPlayer: function(page, callback, searchName, searchPos) {
        Ajax.get('/getMarketPlayer/' + page + '/', {
            'searchName': searchName,
            'searchPos': searchPos
        }, callback);
    }
}
