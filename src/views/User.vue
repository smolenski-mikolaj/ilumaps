<template>
  <div>
    <mdb-container class="user py-5">
      <div v-if="user.email">
        <h4>Dane</h4>
        <div>email: <span class="text-info pl-2">{{ user.email }}</span></div>

        <hr class="my-5" />

        <h4>Złożone zamówienia</h4>
        <div v-if="orders.length" class="text-info">
          <table class="table">
            <thead>
              <tr>
                <th>Identyfikator</th>
                <th>Status płatności</th>
                <th>Suma</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(order, key) in orders" :key="key">
                <td>{{ order.nr }}</td>
                <td :class="order.confirmed == 1 ? 'text-success' : 'text-info'">{{ order.confirmed == 1 ? 'opłacone'  : 'w trakcie realizacji' }}</td>
                <td>{{ order.price }} zł</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-info">Brak zamówień</div>

        <hr class="my-5" />

        <h4 class="mb-3">Opcje</h4>
        <button class="d-block" @click="logoutAllForm.active = !logoutAllForm.active" :class="{'active': logoutAllForm.active}">Wyloguj na wszystkich urządzeniach</button>
        <div v-if="logoutAllForm.active" class="pl-4 pb-4 mb-2 border-left">
          <form @submit.prevent="logoutAll">
            <mdb-row>
              <mdb-col sm="6">
                <p class="mt-3">Potwierdź hasłem wylogowanie ze wszystkich urządzeń</p>
                <mdb-input outline type="password" v-model="logoutAllForm.pass" placeholder="hasło" />
                <mdb-input outline type="password" v-model="logoutAllForm.passConfirmation" placeholder="potwierdź hasło" />
              </mdb-col>
            </mdb-row>
            <button>Wyloguj</button>
            <p class="text-info mt-3">{{ logoutAllForm.responseMsg }}</p>
          </form>
        </div>

        <button class="d-block" @click="deleteAccountForm.active = !deleteAccountForm.active" :class="{'active': deleteAccountForm.active}">Usuń konto</button>
        <div v-if="deleteAccountForm.active" class="pl-4 pb-4 mb-2 border-left">
          <form @submit.prevent="deleteAccount">
            <mdb-row>
              <mdb-col sm="6">
                <p class="mt-3">Potwierdź hasłem usunięcie konta i wszystkich danych. Operacja jest nieodwracalna!</p>
                <mdb-input outline type="password" v-model="deleteAccountForm.pass" placeholder="hasło" />
                <mdb-input outline type="password" v-model="deleteAccountForm.passConfirmation" placeholder="potwierdź hasło" />
              </mdb-col>
            </mdb-row>
            <button>Usuwam konto</button>
            <p class="text-info mt-3">{{ deleteAccountForm.responseMsg }}</p>
          </form>
        </div>

        <button class="d-block" @click="passwordChangeForm.active = !passwordChangeForm.active" :class="{'active': passwordChangeForm.active}">Zmień hasło</button>
        <div v-if="passwordChangeForm.active" class="pl-4 pb-4 border-left">
          <form @submit.prevent="changePassword">
            <mdb-row>
              <mdb-col sm="6">
                <p class="mt-3">Ustal nowe hasło</p>
                <mdb-input outline type="password" v-model="passwordChangeForm.oldPass" placeholder="dotychczasowe hasło" />
                <mdb-input outline type="password" v-model="passwordChangeForm.newPass" placeholder="nowe hasło" />
                <mdb-input outline type="password" v-model="passwordChangeForm.newPassConfirmation" placeholder="potwierdź nowe hasło" />
              </mdb-col>
            </mdb-row>
            <button>Potwierdzam</button>
            <p class="text-info mt-3">{{ passwordChangeForm.responseMsg }}</p>
          </form>
        </div>

      </div>
    </mdb-container>

    <mdb-footer />
  </div>
  
</template>

<script>
import mdbContainer from 'mdbvue/lib/components/mdbContainer'
import mdbRow from 'mdbvue/lib/components/mdbRow'
import mdbCol from 'mdbvue/lib/components/mdbCol'
import mdbInput from 'mdbvue/lib/components/mdbInput'
import mdbFooter from '../components/Footer'
import axios from 'axios'

export default {
  name: 'user',
  components: {
    mdbContainer,
    mdbInput,
    mdbRow,
    mdbCol,
    mdbFooter
  },
  data() {
    return {
      user: {},
      logoutAllForm: {
        active: false,
        pass: null,
        passConfirmation: null,
        responseMsg: null
      },
      passwordChangeForm: {
        active: false,
        oldPass: null,
        pass: null,
        passConfirmation: null,
        responseMsg: null
      },
      deleteAccountForm: {
        active: false,
        pass: null,
        passConfirmation: null,
        responseMsg: null
      },
      orders: []
    }
  },
  beforeCreate() {
    this.$store.commit('loadingOn')

    axios.get('/api/get/user')
    .then(response => {
      if (response.data.pass) {
        this.user = response.data
      }
    })
    .catch(error => {
      console.log(error)
    })

    axios.get('/api/get/orders')
    .then(response => {
      if (response.data) {
        this.orders = response.data
      }
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      this.$store.commit('loadingOff')
    })

    this.$store.subscribe(mutation => {
      if (mutation.type === 'logout') {
        this.user = {}
        this.$router.push('login')
      }
    })
  },
  methods: {
    logoutAll() {
      if (!this.logoutAllForm.pass || !this.logoutAllForm.passConfirmation) return alert('Wypełnij poprawnie formularz')
      if (this.logoutAllForm.pass !== this.logoutAllForm.passConfirmation) return alert('Podane hasła nie są jednakowe')
      this.$store.commit('loadingOn')
      axios.post('/api/post/logoutAll', {
        pass: this.logoutAllForm.pass
      })
      .then(response => {
        if (response.data.pass) {
          this.$router.push('login')
          window.location.reload()
        } else {
          this.logoutAllForm.responseMsg = response.data
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.$store.commit('loadingOff')
      })
    },
    deleteAccount() {
      if (!this.deleteAccountForm.pass || !this.deleteAccountForm.passConfirmation) return alert('Wypełnij poprawnie formularz')
      if (this.deleteAccountForm.pass !== this.deleteAccountForm.passConfirmation) return alert('Podane hasła nie są jednakowe')
      this.$store.commit('loadingOn')
      axios.post('/api/post/delete_account', {
        pass: this.deleteAccountForm.pass
      })
      .then(response => {
        if (response.data.pass) {
          this.$router.push('login')
          window.location.reload()
        } else {
          this.deleteAccountForm.responseMsg = response.data.msg
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.$store.commit('loadingOff')
      })
    },
    changePassword() {
      if (!this.passwordChangeForm.newPass || !this.passwordChangeForm.newPassConfirmation) return alert('Wypełnij poprawnie formularz')
      if (this.passwordChangeForm.oldPass ===  this.passwordChangeForm.newPass) return alert('Nowe hasło powinno być inne niż dotychczasowe')
      if (this.passwordChangeForm.newPass !== this.passwordChangeForm.newPassConfirmation) return alert('Podane hasła nie są jednakowe')
      this.$store.commit('loadingOn')
      axios.post('/api/post/passwordChange', {
        oldPass: this.passwordChangeForm.oldPass,
        newPass: this.passwordChangeForm.newPass,
        newPassConfirmation: this.passwordChangeForm.newPassConfirmation
      })
      .then(response => {
        if (response.data.pass) {
          this.$router.push('login')
          window.location.reload()
        } else {
          this.passwordChangeForm.responseMsg = response.data
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.$store.commit('loadingOff')
      })
    }
  }
}
</script>

<style scoped>
.user {
  min-height: 75vh;
}
</style>