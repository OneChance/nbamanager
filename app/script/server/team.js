import Ajax from './ajax.js'

export default {
    getTeamInfo: function() {
        return Ajax.getData('/getTeamInfo/', null);
    },
    signPlayer: function(data) {
        return Ajax.postData('/signPlayer/', data);
    },
    breakPlayer: function(data) {
        return Ajax.postData('/breakPlayer/', data);
    },
    changePlayerPos: function(data) {
        return Ajax.postData('/changePlayerPos/', data);
    },
    getContractLog: function(page, searchName) {
        return Ajax.getData('/getContractLog/' + page + '/', {
            'searchName': searchName
        })
    },
    changeTeamName: function(data) {
        return Ajax.postData('/changeTeamName/', data);
    }
}
