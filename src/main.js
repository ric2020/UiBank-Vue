import Vue from 'vue'
import App from './App.vue'
import store from "./store.js";
import vuetify from './plugins/vuetify';
import vueRouter from 'vue-router';
import Accounts from './components/Accounts';
import Account from './components/Account';
import Quotes from './components/Quotes';
import NewQuote from './components/NewQuote';
import Quote from './components/Quote';
import Register from './components/Register';
import Login from './components/Login';
import VueRouter from 'vue-router';

Vue.config.productionTip = false
Vue.use(vueRouter)

const routes = [
  { path: "/", component: Accounts},
  { path: "/Accounts", component: Accounts},
  { path: "/Account/:id", component: Account},
  { path: "/Quotes", component: Quotes},
  { path: "/NewQuote/", component: NewQuote},
  { path: "/Quote/:id", component: Quote},
  { path: "/Register/", component: Register},
  { path: "/Login/", component: Login}
]

const router = new VueRouter({routes})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
