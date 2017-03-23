import Ajax from './ajax.js'

export default {
    getStatistic: function(playerId, callback) {
        Ajax.get('/getStatistic/'+playerId+"/",null, callback);
    }
}
