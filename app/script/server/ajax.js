import GlobalVue from '../globalVue.js'
import Toastr from '../../plugin/toastr/toastr.min'
import Message from '../message.js'

export default {
    post: function(apiUrl, data, callback) {
        ajaxReq(apiUrl, data, 'post', callback);
    },
    get: function(apiUrl, data, callback) {
        ajaxReq(apiUrl, data, 'get', callback);
    }
}

let url = "http://localhost:8080";
let ajaxReq = function(apiUrl, data, type, callback) {

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
                GlobalVue.instance.$router.push('sign')
                if (location.hash === '#/index') {
                    Toastr.error(Message.filters('login_status_error'));
                }
            } else {
                if (callback) {
                    callback(res);
                }
            }
        },
        error: function() {
            Toastr.error(Message.filters('server_error'));
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
