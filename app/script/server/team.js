import Ajax from './ajax.js'

export default {
    getTeamInfo: function(callback) {
        Ajax.get('/getTeamInfo/', null, callback);
    },
    signPlayer: function(data, callback) {
        Ajax.post('/signPlayer/', data, callback);
    },
    breakPlayer: function(data, callback) {
        Ajax.post('/breakPlayer/', data, callback);
    },
    changePlayerPos: function(data, callback) {
        Ajax.post('/changePlayerPos/', data, callback);
    },
    getContractLog: function(page, callback, searchName) {
        Ajax.get('/getContractLog/' + page + '/', {
            'searchName': searchName
        }, callback);
    }
}
