import Ajax from './ajax.js'

export default {
    getTeamInfo: function(callback) {
        Ajax.get('/getTeamInfo/', null, callback);
    },
    signPlayer: function(data, callback) {
        Ajax.post('/signPlayer/', data, callback);
    }
}
