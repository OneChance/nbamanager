import GlobalVue from '../globalVue.js'
import Toastr from '../../plugin/toastr/toastr.min.js'
import Message from '../message.js'
import Env from './env.js'

export default {
    async getData(apiUrl, data) {
        return await ajaxReqPromise(apiUrl, data, 'get');
    },
    async postData(apiUrl, data) {
        return await ajaxReqPromise(apiUrl, data, 'post');
    }
}

let url = Env.baseURL;

let ajaxReqPromise = function(apiUrl, data, type) {
    return new Promise(function(resolve, reject) {
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
                }
                resolve(res);
            },
            error: function() {
                Toastr.error(Message.filters('server_error'));
                reject();
            }
        }

        if (data) {
            let dataPass = {
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
    })
}
