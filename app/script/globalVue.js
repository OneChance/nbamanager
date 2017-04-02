import Vue from 'vue'
import VueRouter from 'vue-router'
import SignComponent from '../components/Sign.vue'
import IndexComponent from '../components/Index.vue'

export default {
    instance: null,
    initApp: function() {
        if (!this.instance) {
            Vue.use(VueRouter)
            const routes = [{
                    path: '/sign',
                    component: SignComponent
                }, {
                    path: '/',
                    component: SignComponent
                },
                {
                    path: '/index',
                    component: IndexComponent
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
