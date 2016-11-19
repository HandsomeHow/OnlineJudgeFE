import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
// import VueI18n from 'vue-i18n'

Vue.use(Element)
Vue.use(VueRouter)
// Vue.use(VueI18n)

// 引入 view 组件
import { Announcement, User, Conf } from './views'
const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/announcement',
      name: 'announcement',
      component: Announcement
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/conf',
      name: 'conf',
      component: Conf
    },
    {
      path: '*', redirect: '/announcement'
    }
  ]
})

for (var msgType of ['success', 'warning', 'info', 'error']) {
  window[msgType] = (msg) => {
    Vue.prototype.$message({
      showClose: true,
      message: msg,
      type: msgType
    })
  }
}

var message = (msg, msgType) => {
  Vue.prototype.$message({
    showClose: true,
    message: msg,
    type: msgType
  })
}

window.error = (msg) => {
  message(msg, 'error')
}

window.alert = (msg) => {
  message(msg, 'info')
}

window.success = (msg) => {
  if (!msg) {
    message('Succeeded', 'success')
  } else {
    message(msg, 'success')
  }
}

new Vue(Vue.util.extend({ router }, App)).$mount('#app')
