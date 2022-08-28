// 1.按需导入对应的函数
import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './components/MyLogin.vue'
import Home from './components/MyHome.vue'

//右侧边栏子组件
import Users from './components/menus/MyUsers.vue'
import Rights from './components/menus/MyRights.vue'
import Goods from './components/menus/MyGoods.vue'
import Orders from './components/menus/MyOrders.vue'
import Settings from './components/menus/MySettings.vue'

// 用户详情页
import UserDetail from './components/user/MyUserDetail.vue'

// 2.创建路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        // 路由重定向
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login, nanme: 'login' },
        // home 组件的路由规则
        {
            path: '/home',
            component: Home,
            name: 'home',
            // 用户访问/home时,重定向到 /home/users
            redirect: '/home/users',
            // 子路由规则
            children: [
                { path: 'users', component: Users },
                { path: 'rights', component: Rights },
                { path: 'goods', component: Goods },
                { path: 'orders', component: Orders },
                { path: 'settings', component: Settings },
                // 用户详情的路由规则
                { path: 'users/:id', component: UserDetail, props: true },
            ]
        },
    ],
})

router.beforeEach((to, from, next) => {
    // 如果用户访问的是登录页面, 直接放行
    if (to.path === '/login') return next()
    // 获取 token 值
    const token = localStorage.getItem('token')
    if (!token) {
        // token值不存在,强制跳转到登录页面
        return next('/login')
    }
    // 存在token值 直接放行
    next()
})

// 3.对外共享路由是咧对象
export default router