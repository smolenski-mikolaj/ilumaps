<template>
  <div>
    <mdb-container class="cart py-5">
      <h2>Koszyk</h2>
      <template v-if="$store.state.user.id && !$store.state.orderStarted">
        <div class="table-responsive" v-if="cart.length">
          <table class="table">
            <thead>
              <tr>
                <th>Mapa</th>
                <th>Data utworzenia</th>
                <th>Format</th>
                <th>Cena (szt.)</th>
                <th>Ilość</th>
                <th>Wartość</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(map, key) in cart" :key="key">
                <td @click="$refs.lightbox.showImage(key)" style="cursor: pointer">
                  <img :src="`./carts/previews/${map.preview}`" alt="Podgląd mapy" height="35" width="35" style="padding: 2px; border-radius: 50%; border: 1px solid grey" class="mr-2" /><span>{{ map.name }}</span>
                </td>
                <td>{{ map.created }}</td>
                <td>{{ map.format }} cm</td>
                <td><strike class="text-muted pr-2" v-if="map.itemPrice !== map.itemPriceWithDiscount">{{ map.itemPrice }} zł<br></strike><span>{{ map.itemPriceWithDiscount }}</span> zł</td>
                <td><mdb-input bg @change.native="cartUpdate($event, map.token)" type="number" label="Wprowadź ilość" class="m-0" :min="1" :max="100" :value="map.items" style="width: 110px" /></td>
                <td><strike class="text-muted pr-2" v-if="map.price !== map.priceWithDiscount">{{ map.price }} zł<br></strike><span class="font-weight-bold">{{ map.priceWithDiscount }} zł</span></td>
                <td>
                  <button @click="loadMapData(map.editorData)">Wczytaj</button>
                  <button @click="remove(map.token)">Usuń</button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="5"></td>
                <td class="text-right">Suma:</td>
                <td><strike class="text-muted pr-2" v-if="order.overallPrice !== order.overallPriceWithDiscount">{{ order.overallPrice }} zł</strike><span v-if="order.discount" class="badge badge-success">- {{ order.discount }}%</span><h3 class="font-weight-bold text-large">{{ order.overallPriceWithDiscount }} zł</h3></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div v-else class="text-info mb-5">Twój koszyk jest pusty</div>

        <form v-if="cart.length" @submit.prevent="checkDiscountCode" class="discount-form">
          <mdb-input bg class="my-0" style="width: 200px" label="Kod rabatowy" ref="discountCodeInput" :value="order.discountCode || ''" />
          <button><i class="fas fa-check" /></button>
        </form>

        <p class="mt-5">Projekty znajdujące się w koszyku przechowywane są przez miesiąc od momentu utworzenia.</p>

        <button class="main mt-5 order-button" v-if="cart.length" @click="moveToOrder">Zamawiam</button>
        <a href="/editor"><button class="second">Powrót do edytora</button></a>


        <light-box 
          ref="lightbox"
          :showLightBox="false"
          :images="images" />
      </template>
    </mdb-container>

    <mdb-footer />
  </div>

</template>

<script>
import mdbContainer from 'mdbvue/lib/components/mdbContainer'
import mdbInput from 'mdbvue/lib/components/mdbInput'
import axios from 'axios'
import LightBox from 'vue-image-lightbox'
import mdbFooter from '../components/Footer'

export default {
  name: 'cart',
  components: {
    mdbContainer,
    mdbInput,
    mdbFooter,
    LightBox
  },
  data() {
    return {
      cart: [],
      order: [],
      images: []
    }
  },
  created() {
    // this.loadCart()

    // this.$store.subscribe(mutation => {
    //   if (mutation.type === 'login') {
    //     this.loadCart()
    //   }
    // })
  },
  methods: {
    loadCart() {
      this.$store.commit('loadingOn')

      axios.get('/api/get/cart')
      .then(response => {
        if (response.data.pass) {
          this.cart = []
          this.images = []
          for (const key in response.data.cart) {
            this.cart.push({
              name: response.data.cart[key].name,
              token: response.data.cart[key].token,
              preview: response.data.cart[key].preview,
              editorData: response.data.cart[key].editorData !== '' ? JSON.parse(response.data.cart[key].editorData) : null,
              created: response.data.cart[key].created,
              format: response.data.cart[key].format,
              itemPrice: response.data.cart[key].itemPrice,
              itemPriceWithDiscount: response.data.cart[key].itemPriceWithDiscount,
              items: response.data.cart[key].items,
              price: response.data.cart[key].price,
              priceWithDiscount: response.data.cart[key].priceWithDiscount,
              discount: response.data.cart[key].discount
            })
            this.images.push({
              thumb: `./carts/previews/${response.data.cart[key].preview}`,
              src: `./carts/previews/${response.data.cart[key].preview}`
            })
          }
          this.order = response.data.order
          this.$store.commit('updateCart', this.cart)
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.$store.commit('loadingOff')
      })
    },
    loadMapData(editorData) {
      this.$store.commit('changeEditorData', editorData)
      this.$router.push('editor')
    },
    remove(mapToken) {
      this.$store.commit('loadingOn')

      axios.post('/api/post/mapRemove', {
        mapToken
      })
      .then(() => {
        this.loadCart()
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.$store.commit('loadingOff')
      })
    },
    cartUpdate(e, mapToken) {
      const items = e.target.value
      axios.post('/api/post/cart', {
        items,
        mapToken
      })
      .then(() => {
        this.loadCart()
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.$store.commit('loadingOff')
      })
    },
    checkDiscountCode() {
      this.$store.commit('loadingOn')

      let discountCode = this.$refs.discountCodeInput.$data.innerValue
      axios.post('/api/get/cart', { discountCode })
      .then(response => {
        if (response.data.pass) {
          this.cart = []
          this.images = []
          for (const key in response.data.cart) {
            this.cart.push({
              name: response.data.cart[key].name,
              token: response.data.cart[key].token,
              preview: response.data.cart[key].preview,
              editorData: response.data.cart[key].editorData !== '' ? JSON.parse(response.data.cart[key].editorData) : null,
              created: response.data.cart[key].created,
              format: response.data.cart[key].format,
              itemPrice: response.data.cart[key].itemPrice,
              itemPriceWithDiscount: response.data.cart[key].itemPriceWithDiscount,
              items: response.data.cart[key].items,
              price: response.data.cart[key].price,
              priceWithDiscount: response.data.cart[key].priceWithDiscount,
              discount: response.data.cart[key].discount
            })
            this.images.push({
              thumb: `./carts/previews/${response.data.cart[key].preview}`,
              src: `./carts/previews/${response.data.cart[key].preview}`
            })
          }
          this.order = response.data.order
          this.$store.commit('updateCart', this.cart)
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.$store.commit('loadingOff')
      })
    },
    moveToOrder() {
      this.$store.commit('toggleOrderStatus', true)
      this.$router.push('order')
    }
  }
};
</script>

<style scoped>
input {
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
}

.cart {
  min-height: 75vh;
}
</style>

<style>
.cart .table th, .table td {
  vertical-align: middle;
  white-space: nowrap;
}
.cart .table strike {
  font-size: 12px;
}

/* Chrome, Safari, Edge, Opera */
.cart input::-webkit-outer-spin-button,
.cart input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.cart input[type=number] {
  -moz-appearance:textfield;
}

.cart .discount-form .md-form {
  display: inline-block;
}
.cart .discount-form .md-form input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 1px solid #ced4da;
}
.cart .discount-form button {
  position: absolute;
  height: 48px;
  width: 48px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>