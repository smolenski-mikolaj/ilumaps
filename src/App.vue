<template>
  <div id="app">
    <mdb-navbar light color="white">
      <mdb-navbar-brand to="/">
        <img src="./assets/logo.png" alt="Logo" class="px-2" />
      </mdb-navbar-brand>
      <transition name="fade">
        <div v-if="loading" class="spinner spinner-border spinner-border-sm" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </transition>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right class="font-weight-bold">
          <mdb-nav-item darkWaves to="/editor"><mdb-icon icon="pen-square" /> Edytor</mdb-nav-item>
          <template v-if="user.id">
            <mdb-nav-item darkWaves to="/user"><mdb-icon icon="user" /> Konto</mdb-nav-item>
            <mdb-nav-item
              v-if="$store.state.orderStarted"
              style="background-color: #fffff1"
              darkWaves
              to="/order"
              ><mdb-icon icon="wallet" /> Zamówienie</mdb-nav-item
            >
            <mdb-nav-item v-else darkWaves to="/cart"
              ><mdb-icon icon="shopping-cart" /> Koszyk
              <span v-if="cart.length">({{ cart.length }})</span></mdb-nav-item
            >
            <mdb-nav-item title="Wyloguj" darkWaves @click.native="logout" class="ml-2 px-1"
              ><mdb-icon icon="power-off"
            /></mdb-nav-item>
          </template>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <transition name="fade" mode="out-in">
      <router-view v-on:login="login" />
    </transition>

    <transition name="fade">
      <loader v-if="loading" :saving="saving" />
    </transition>

    <transition name="fade" mode="out-in">
      <aside v-if="!cookies" class="cookies-prompt">
        <div class="container">
          <div class="row">
            <div class="col-sm-10">
              <p class="mb-0">
                Wykorzystujemy pliki cookies w celu prawidłowego działania strony, korzystania z
                narzędzi analitycznych i marketingowych oraz zapewniania funkcji społecznościowych.
                Szczegóły znajdziesz w
                <a href="polityka-prywatnosci" target="_blank">polityce prywatności</a>. Pozostając
                na stronie zgadzasz się na ich stosowanie.
              </p>
            </div>
            <div class="col-sm-2 text-center">
              <p class="mb-0">
                <button @click="acceptCookies" class="accept-cookies">Rozumiem</button>
              </p>
            </div>
          </div>
        </div>
      </aside>
    </transition>
  </div>
</template>

<script>
import mdbNavbar from "mdbvue/lib/components/mdbNavbar";
import mdbNavbarBrand from "mdbvue/lib/components/mdbNavbarBrand";
import mdbNavbarToggler from "mdbvue/lib/components/mdbNavbarToggler";
import mdbNavbarNav from "mdbvue/lib/components/mdbNavbarNav";
import mdbNavItem from "mdbvue/lib/components/mdbNavItem";
import mdbIcon from "mdbvue/lib/components/mdbIcon";
import Loader from "./components/Loader";
import axios from "axios";

export default {
  name: "app",
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbIcon,
    Loader
  },
  data() {
    return {
      user: {
        id: null,
        token: null,
        email: null
      },
      cart: [],
      loading: false,
      saving: false,
      cookies: true
    };
  },
  beforeCreate() {
    // axios.get('/api/get/verifyUser')
    // .then(response => {
    //   if (response.data.pass) {
    //     this.$store.commit('login', response.data)
    //     this.user.id = response.data.userId
    //     this.user.token = response.data.userToken
    //     this.user.email = response.data.userEmail
    //     this.loadCart()
    //   }
    // })
    // .catch(error => {
    //   console.log(error)
    // })
    // .finally(() => {
    //   this.$store.commit('loadingOff')
    // })
    // axios.get('/api/get/cookies')
    // .then(response => {
    //   if (Boolean(response.data) === false) {
    //     this.cookies = false;
    //   }
    // })
    // this.$store.subscribe(mutation => {
    //   if (mutation.type === 'updateCart') this.cart = mutation.payload
    //   if (mutation.type === 'loadingOn') this.loading = true
    //   if (mutation.type === 'loadingOff') this.loading = false
    //   if (mutation.type === 'savingOn') {
    //     this.loading = true
    //     this.saving = true
    //   }
    //   if (mutation.type === 'savingOff') {
    //     this.loading = false
    //     this.saving = false
    //   }
    // })
  },
  methods: {
    login(data) {
      this.$store.commit("loadingOn");
      axios
        .post("/api/post/login", {
          email: data.email,
          pass: data.pass
        })
        .then(response => {
          if (response.data.pass) {
            this.$store.commit("login", response.data);
            this.user.id = response.data.userId;
            this.user.token = response.data.userToken;
            this.user.email = response.data.userEmail;
            this.loadCart();
            this.$router.push("editor");
          } else {
            alert(response.data);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.$store.commit("loadingOff");
        });
    },
    logout() {
      this.$store.commit("loadingOn");

      axios
        .get("/api/get/logout")
        .then(() => {
          this.$store.commit("logout");
          this.user.id = null;
          this.user.token = null;
          this.user.email = null;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.$store.commit("loadingOff");
          this.$router.push("/");
          window.location.reload();
        });
    },
    loadCart() {
      this.$store.commit("loadingOn");

      axios
        .get("/api/get/cart")
        .then(response => {
          if (response.data.pass) {
            delete response.data.pass;
            this.cart = [];
            for (const key in response.data.cart) {
              this.cart.push({
                name: response.data.cart[key].name
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.$store.commit("loadingOff");
        });
    },
    acceptCookies() {
      axios.get("/api/post/cookies");
      this.cookies = true;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Ubuntu:400,700&display=swap");

@import "scss/variables.scss";
@import "scss/mixins.scss";

#app {
  position: relative;
  font-family: "Ubuntu", Helvetica, Arial, sans-serif;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  nav .spinner {
    color: $iluColor2;
  }
  strong {
    font-weight: 700;
  }
}

.md-form.md-bg label {
  pointer-events: none;
}
.md-form.md-bg label.active {
  transform: translateY(-5px) scale(0.75);
  padding-left: 1rem;
  color: #b38600;
}
.md-form.md-bg input[type="text"],
.md-form.md-bg input[type="password"],
.md-form.md-bg input[type="email"],
.md-form.md-bg input[type="url"],
.md-form.md-bg input[type="time"],
.md-form.md-bg input[type="date"],
.md-form.md-bg input[type="datetime-local"],
.md-form.md-bg input[type="tel"],
.md-form.md-bg input[type="number"],
.md-form.md-bg input[type="search-md"],
.md-form.md-bg input[type="search"],
.md-form.md-bg textarea.md-textarea {
  border-radius: 10px;
  background-image: linear-gradient(to bottom, #b38600, #b38600),
    linear-gradient(to bottom, #ced4da, #ced4da);
  transition: all 0.3s;
  &:hover {
    background-color: #dcdcdc;
  }
}
.md-form input:not([type]):focus:not([readonly]) + label,
.md-form input[type="text"]:not(.browser-default):focus:not([readonly]) + label,
.md-form input[type="password"]:not(.browser-default):focus:not([readonly]) + label,
.md-form input[type="email"]:not(.browser-default):focus:not([readonly]) + label,
.md-form input[type="url"]:not(.browser-default):focus:not([readonly]) + label,
.md-form input[type="time"]:not(.browser-default):focus:not([readonly]) + label,
.md-form input[type="date"]:not(.browser-default):focus:not([readonly]) + label,
.md-form input[type="datetime"]:not(.browser-default):focus:not([readonly]) + label,
.md-form input[type="datetime-local"]:not(.browser-default):focus:not([readonly]) + label,
.md-form input[type="tel"]:not(.browser-default):focus:not([readonly]) + label,
.md-form input[type="number"]:not(.browser-default):focus:not([readonly]) + label,
.md-form input[type="search"]:not(.browser-default):focus:not([readonly]) + label,
.md-form input[type="search-md"]:focus:not([readonly]) + label,
.md-form textarea.md-textarea:focus:not([readonly]) + label {
  color: #b38600;
}
.md-form.md-bg > input[type]:-webkit-autofill:not(.browser-default):not([type="search"]) + label,
.md-form.md-bg > input[type="time"]:not(.browser-default) + label {
  transform: translateY(-5px) scale(0.75);
  transform-origin: 0 100%;
  font-size: initial;
}

button {
  border: none;
  border: 1px solid #f5f5f5;
  border-radius: 10px;
  background: #f5f5f5;
  margin: 0 4px 4px 0;
  padding: 6px 10px;
  transition: all 0.2s;
  &:hover {
    background: #dcdcdc;
  }
  &:active,
  &.active {
    border-color: #b38600;
  }
  &:focus {
    outline: none;
    border-color: #7d5e00;
  }
}

button.main {
  background-color: $iluColor;
  border: 1px solid $iluColor;
  border-radius: 0;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 700;
  &:hover {
    background: #ffde7b;
  }
  &:active,
  &.active {
    border-color: #7d5e00;
  }
  &:focus {
    outline: none;
    border-color: #7d5e00;
  }
}

button.second {
  @extend button.main;
  background-color: $iluColor2;
  border: 1px solid $iluColor2;
  color: #dddddd;
  &:hover {
    background: #757575;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
}

.navbar {
  box-shadow: none;
  font-size: 14px;
  border-bottom: 1px solid #dddddd;
  .navbar-brand img {
    height: 30px;
  }
  li {
    border-radius: 10px;
    margin-left: 5px;
  }
  a {
    border-radius: 10px;
    color: $iluColor2;
    &:hover {
      background: #dcdcdc;
    }
    &.active {
      background: #eeeeee;
    }
  }
}

.badge-warning {
  background-color: $iluColor !important;
  color: black !important;
  font-weight: 700;
}

.table thead th {
  border-bottom: 1px solid #dee2e6;
  font-weight: 700;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
  overflow: hidden;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.vue-lb-container button:hover {
  background-color: transparent;
}

.cookies-prompt {
  position: fixed;
  z-index: 1500;
  bottom: 0;
  width: 100%;
  padding: 20px;
  font-size: 12px;
  background-color: #ffffff;
  border-top: 1px solid #dddddd;
  a {
    color: #876500;
  }
  button {
    font-weight: 600;
    font-size: 14px;
  }
}
</style>
