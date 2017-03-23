import Ajax from './ajax.js'

export default {
    getMarketPlayer: function(page, callback, searchName) {
        Ajax.get('/getMarketPlayer/' + page + '/', {
            'searchName': searchName
        }, callback);
    }
}
