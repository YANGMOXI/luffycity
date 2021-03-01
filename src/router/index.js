import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LightCourse from '../views/LightCourse.vue'
import FreeCourse from '../views/FreeCourse.vue'
import ActualCourse from '../views/ActualCourse.vue'
import FreeCourseDetail from '../views/FreeCourseDetail.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/free-course',
        name: 'FreeCourse',
        component: FreeCourse
    },
    {
        path: '/actual-course',
        name: 'ActualCourse',
        component: ActualCourse
    },
    {
        path: '/light-course',
        name: 'LightCourse',
        component: LightCourse
    },
    {
        path: '/free/detail/:pk',
        name: 'free-detail',
        component: FreeCourseDetail
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
