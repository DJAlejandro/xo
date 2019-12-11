import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)

const routes = [{
        path: '*',
        redirect: '/'
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/view/pages/explore',
        component: () => import( /* Explore */ '../views/Explore.vue')
    },
    {
        path: '/view/pages/category',
        component: Category
    },
    {
        path: '/album',
        component: () => import( /* Explore */ '../views/AlbumDetail.vue')
    },
    {
        path: '/artist',
        component: () => import( /* Explore */ '../views/ArtistDetail.vue')
    },
    {
        path: '/top-tracks',
        component: () => import( /* Explore */ '../views/TopTracks.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
