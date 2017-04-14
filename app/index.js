import GlobalVue from './script/globalVue.js'
import Account from './script/server/account.js'

window.onload = function() {
    GlobalVue.initApp().$mount('#app')
}

require('./plugin/bootstrap/css/bootstrap.min.css')
require('./plugin/toastr/toastr.min.css')
require('./plugin/flatui/css/flat-ui.css')
require('./style/css/app.scss')
require('./plugin/bootstrap/js/bootstrap.min.js')
require('./plugin/goup/jquery.goup.min.js')
require('./plugin/flatui/js/flat-ui.min.js')
