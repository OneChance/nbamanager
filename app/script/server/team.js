import Ajax from './ajax.js'

export default {
    getTeamInfo: function(callback) {
        Ajax.get('/getTeamInfo/', null, callback);
    }
}
