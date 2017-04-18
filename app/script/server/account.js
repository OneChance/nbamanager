import Ajax from './ajax.js'
import GlobalVue from '../globalVue.js'

export default {
    signIn: function(data) {
        return Ajax.postData('/signIn/', data);
    },
    isLogin: function() {
        return Ajax.getData('/isLogin/', "");
    },
    signOut: function() {
        return Ajax.postData('/signOut/', {});
    },
    signUp: function(data) {
        return Ajax.postData('/signUp/', data);
    }
}
