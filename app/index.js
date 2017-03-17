import Vue from 'vue'
import Index from './components/Index.vue'
import $ from 'expose-loader?$!jquery'

window.onload = function() {
    new Vue({
        el: '#app',
        components: {
            'index-component': Index
        },
    });
}

require('./style/css/bootstrap.min.css');
require('./style/css/font-awesome.min.css');
require('./style/css/app.scss');
require('./script/bootstrap.min.js');
