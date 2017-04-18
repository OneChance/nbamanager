import Ajax from './ajax.js'

export default {
    getMarketPlayer: function(page, searchName, searchPos) {
        return Ajax.getData('/getMarketPlayer/' + page + '/', {
            'searchName': searchName,
            'searchPos': searchPos
        });
    }
}
