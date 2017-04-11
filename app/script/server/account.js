import Ajax from './ajax.js'
import GlobalVue from '../globalVue.js'

export default {
    signIn: function(data, callback,serverErrorCallback) {
        Ajax.post('/signIn/', data, callback,serverErrorCallback);
    },
    isLogin: function(callback) {
        Ajax.get('/isLogin/', "", callback);
    },
    signOut: function(callback) {
        Ajax.post('/signOut/', {}, callback);
    },
    checkLogin(callback) {
        this.isLogin((res) => {
            if (res.type === 'success') {
                GlobalVue.instance.$router.push('index');
                if (callback) {
                    callback();
                }
            } else {
                GlobalVue.instance.$router.push('sign');
            }
        })
    },
    signUp: function(data, callback,serverErrorCallback) {
        Ajax.post('/signUp/', data, callback,serverErrorCallback);
    }
}
