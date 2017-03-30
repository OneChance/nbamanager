import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Index from '../components/Index.vue'

export default {
    instance: null,
    initApp: function() {
        if (!this.instance) {
            Vue.use(VueRouter)
            const routes = [{
                    path: '/login',
                    component: Login
                }, {
                    path: '/',
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
            this.instance = new Vue({
                router
            });
        }
        return this.instance;
    }
}
