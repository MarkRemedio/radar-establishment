import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './../components/Dashboard.vue'
import Login from './../components/Login.vue'
import NotFound from './../components/NotFound.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
             name: 'login', 
             path: '/', 
             component: Login,
             meta: {
                 requiresVisitor: true,
             } 
        },
        { 
            name: 'establishment', 
            path: '/establishment', 
            component: Dashboard,
            meta: {
                requiresAuth: true,
            } 
        },
        { 
            path: '*', 
            component: NotFound 
        },
    ]
})