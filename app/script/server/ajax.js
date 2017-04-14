import GlobalVue from '../globalVue.js'
import Toastr from '../../plugin/toastr/toastr.min.js'
import Message from '../message.js'
import Env from './env.js'

export default {
    post: function(apiUrl, data, callback, serverErrorCallback) {
        ajaxReq(apiUrl, data, 'post', callback, serverErrorCallback);
    },
    get: function(apiUrl, data, callback, serverErrorCallback) {
        ajaxReq(apiUrl, data, 'get', callback, serverErrorCallback);
    }
}

let url = Env.baseURL;
let ajaxReq = function(apiUrl, data, type, callback, serverErrorCallback) {

    let options = {
        contentType: "application/json; charset=utf-8",
        xhrFields: {
            withCredentials: true
        },
        url: url + apiUrl,
        type: type,
        dataType: "json",
        success: function(res) {
            if (res && res.content === 'login_status_error') {
                $(".modal-backdrop").remove()
                if (location.hash === '#/index') {
                    Toastr.error(Message.filters('login_status_error'));
                }
                GlobalVue.instance.$router.push('sign')
            } else {
                if (callback) {
                    callback(res);
                }
            }
        },
        error: function() {
            Toastr.error(Message.filters('server_error'));
            if (serverErrorCallback) {
                serverErrorCallback();
            }
        }
    }

    if (data) {
        var dataPass = {
            data: data
        };
        if (type === 'post') {
            dataPass = {
                data: JSON.stringify(data)
            }
        }
        Object.assign(options, dataPass);
    }

    $.ajax(options);
}
