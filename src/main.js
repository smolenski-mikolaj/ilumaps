import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import '@fortawesome/fontawesome-free/css/brands.min.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'

import 'vuelayers/lib/style.css'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import 'vue-image-lightbox/dist/vue-image-lightbox.min.css'

import 'vue-files-dropper'
import 'vue-files-dropper/dist/vue-files-dropper.css'

import 'pretty-checkbox/dist/pretty-checkbox.min.css'

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { Map } from 'vuelayers'
Vue.use(Map)

import VueDraggableResizable from 'vue-draggable-resizable'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)

import PrettyCheck from 'pretty-checkbox-vue/check'
import PrettyRadio from 'pretty-checkbox-vue/radio'
Vue.component('p-check', PrettyCheck)
Vue.component('p-radio', PrettyRadio)

import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
