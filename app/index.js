import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Index from './components/Index.vue'

window.onload = function() {

    Vue.use(VueRouter)

    const routes = [{
            path: '/login',
            component: Login
        },
        {
            path: '/index',
            component: Index
        }
    ]

    const router = new VueRouter({
        routes
    })

    new Vue({
        router
    }).$mount('#app');

    router.push('login');
}

require('./style/css/bootstrap.min.css');
require('./style/css/font-awesome.min.css');
require('./plugin/toastr/toastr.min.css');
require('./style/css/app.scss');
require('./script/bootstrap.min.js');
require('./plugin/goup/jquery.goup.min.js');
