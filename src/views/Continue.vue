<template>
  <mdb-container class="py-5">
    <h2>Potwierdzenie zamówienia</h2>
    <div class="mt-5" v-if="response" v-html="response"></div>
  </mdb-container>
</template>

<script>
import mdbContainer from 'mdbvue/lib/components/mdbContainer'
import axios from 'axios'

export default {
  name: 'continue',
  components: {
    mdbContainer
  },
  data() {
    return {
      response: null
    }
  },
  mounted() {
    const urlData = this.$route.query
    if (urlData.token && urlData.order_nr) {
      const error = urlData.error || false
      this.$store.commit('loadingOn')
      axios.post('/api/post/continue', {
        token: urlData.token,
        order_nr: urlData.order_nr,
        error
      })
      .then(response => {
        this.response = response.data
        this.$store.commit('toggleOrderStatus', false)
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