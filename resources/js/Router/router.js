import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../components/login/Login'
import Signup from '../components/login/Signup';
import Forum from '../components/forum/Forum'
import Logout from '../components/login/Logout'
import Read from '../components/forum/Read'
import Create from '../components/forum/create'
import createCategory from '../components/category/createCategory';

const routes = [
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/signup', component: Signup},
    { path: '/forum', component: Forum, name : 'forum'},
    { path: '/ask', component: Create},
    { path: '/category', component: createCategory},
    { path: '/questions/:slug', component: Read, name : 'read'},
]

const router = new VueRouter({
    routes ,// short for `routes: routes`
    hashbang: false,
    mode: 'history'
})

export default router
