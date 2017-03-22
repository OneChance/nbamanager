import Ajax from './ajax.js'

export default {
    getGameToday: function(playerId, callback) {
        Ajax.get('/getGameToday/'+playerId+"/",null, callback);
    }
}
