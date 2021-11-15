import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      token: null,
      email: null
    },
    editor: {
      layout: parseInt(localStorage.layout) || 1,
      format: localStorage.format || 'A3',
      orientation: localStorage.orientation || 'landscape',
      heading: localStorage.heading || 'Polska',
      text: localStorage.text || 'Europa',
      img: 'img/example.jpg',
      icon: localStorage.icon ? localStorage.icon === "false" ? false : localStorage.icon : false,
      iconPosition: localStorage.iconPosition ? localStorage.iconPosition.split(',').map(val => parseInt(val)) : [300, 300],
      mapZoom: parseFloat(localStorage.mapZoom) || 6,
      mapCenter: localStorage.mapCenter ? localStorage.mapCenter.split(',').map(val => parseFloat(val)) : [18.42367, 52.11434],
      imgBackgroundPositionX: 0,
      imgBackgroundPositionY: 0
    },
    cart: [],
    orderStarted: localStorage.orderStarted ? JSON.parse(localStorage.orderStarted) : false,
    loading: true,
    saving: false
  },
  mutations: {
    login(state, user) {
      state.user.id = user.userId
      state.user.token = user.userId
      state.user.email = user.userEmail
    },
    logout(state) {
      state.user.id = null
      state.user.token = null
      state.user.email = null
    },
    changeEditorData(state, data) {
      for (const key in data) {
        state.editor[key] = data[key]
        localStorage[key] = data[key]
      }
    },
    updateCart(state, cart) {
      state.cart = cart
    },
    loadingOn(state) {
      state.loading = true
    },
    loadingOff(state) {
      state.loading = false
    },
    savingOn(state) {
      state.loading = true
      state.saving = true
    },
    savingOff(state) {
      state.loading = false
      state.saving = false
    },
    toggleOrderStatus(state, value) {
      state.orderStarted = value
      localStorage.orderStarted = value
    },
    mapZoom(state, direction) {
      direction;
    }
  }
});
