import Ajax from './ajax.js'

export default {
    getStatistic: function(playerId) {
        return Ajax.getData('/getStatistic/' + playerId + "/", null);
    },
    getEvRankToday: function() {
        return Ajax.getData('/getEvRankToday/', null);
    }
}
