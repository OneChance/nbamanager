import Vue from 'vue'
import Index from './components/Index.vue'

window.onload = function() {
    new Vue({
        el: '#app',
        components: {
            'index-component': Index
        },
        mounted: function() {

        }
    });
}

require('./style/css/bootstrap.min.css');
require('./style/css/font-awesome.min.css');
require('./plugin/toastr/toastr.min.css');
require('./style/css/app.scss');
require('./script/bootstrap.min.js');
