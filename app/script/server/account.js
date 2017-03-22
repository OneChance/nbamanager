import Ajax from './ajax.js'

export default {
    login: function(data, callback) {
        Ajax.post('/login/', data, callback);
    },
    isLogin: function(callback) {
        Ajax.get('/isLogin/', "", callback);
    }
}
