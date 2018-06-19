import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '@/views/login/index'
import IndexView from '@/views/home/index'
import WelcomeView from '@/views/welcome/index'

Vue.use(Router)

// 按需加载
// const Index = resolve => require(['@/views/home/index'], resolve)
const MessageDialog = resolve => require(['@/components/dialog/messageDialog'], resolve)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: "login",
      component: LoginView,
      meta: { requiresAuth: false }
    }, {
      path: '/',
      name: "index",
      component: IndexView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'messages/messageChat/:channelId',
          name: 'messageDialog',
          component: MessageDialog
        },
        {
          path: 'welcome',
          name: 'welcome',
          component: WelcomeView        
        }     
      ]
    }
  ]
})

// 验证token，存在才跳转
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('token')
  if (to.path === '/') {
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }

  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
