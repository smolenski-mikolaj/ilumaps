<template>
  <mdb-container class="py-5">
    <div v-if="msg" v-html="msg"></div>
    <div v-if="form">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <mdb-row>
          <mdb-col sm="6">
            <mdb-input bg class="mb-0" type="email" v-model="loginForm.email" label="email" />
            <mdb-input bg class="mt-0" type="password" v-model="loginForm.pass" label="hasło" />
          </mdb-col>
        </mdb-row>
        <button>Login</button>
      </form>
    </div>
  </mdb-container>
</template>

<script>
import mdbContainer from 'mdbvue/lib/components/mdbContainer'
import mdbRow from 'mdbvue/lib/components/mdbRow'
import mdbCol from 'mdbvue/lib/components/mdbCol'
import mdbInput from 'mdbvue/lib/components/mdbInput'
import axios from 'axios'

export default {
  name: 'confirm',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbInput
  },
  data() {
    return {
      msg: null,
      form: false,
      loginForm: {
        email: '',
        pass: ''
      }
    }
  },
  mounted() {
    const urlData = this.$route.query
    if (urlData.id && urlData.token) {
      this.$store.commit('loadingOn')
      axios.post('/api/post/confirm', {
        id: urlData.id,
        token: urlData.token
      })
      .then(response => {
        if (response.data.pass) {
          this.form = true;
          this.msg = response.data.msg;
        } else {
          this.form = false;
          this.msg = response.data;
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.$store.commit('loadingOff')
      })
    }
  },
  methods: {
    login() {
      this.$emit('login', this.loginForm)
    }
  }
}
</script>