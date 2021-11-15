<template>
  <div>
    <mdb-container class="py-5" v-if="$store.state.orderStarted">
      <form @submit.prevent="confirmOrder" v-if="editingOrder">
        <h2 class="mb-2">Formularz zamówienia</h2>
        <p class="text-muted">* - pola wymagane</p>

        <hr class="mb-5" />

        <h4 class="mb-4">Dane zamawiającego</h4>
        <mdb-input
          bg
          m="y0"
          style="max-width: 400px;"
          label="Imię *"
          v-model="order.user.name"
          required
        />
        <mdb-input
          bg
          m="y0"
          style="max-width: 400px;"
          label="Nazwisko *"
          v-model="order.user.lastname"
          required
        />
        <mdb-input
          bg
          m="y0"
          v-mask="'+48 ### ### ###'"
          style="max-width: 400px;"
          label="Telefon *"
          v-model="order.user.phone"
          required
        />

        <p-check class="p-default my-3" name="invoice" color="warning-o" v-model="order.invoice"
          ><i class="icon mdi mdi-check" slot="extra"></i> Faktura na firmę</p-check
        >

        <div v-if="order.invoice">
          <mdb-input
            bg
            m="y0"
            style="max-width: 400px;"
            label="Nazwa *"
            v-model="order.company.name"
            required
          />
          <mdb-input
            bg
            m="y0"
            style="max-width: 400px;"
            label="Adres (ulica i nr budynku/nr lokalu) *"
            v-model="order.company.address"
            required
          />
          <mdb-input
            bg
            m="y0"
            v-mask="'##-###'"
            style="max-width: 400px;"
            label="Kod pocztowy *"
            v-model="order.company.zip"
            required
          />
          <mdb-input
            bg
            m="y0"
            style="max-width: 400px;"
            label="Miejscowość *"
            v-model="order.company.city"
            required
          />
          <mdb-input
            bg
            m="y0"
            v-mask="'##########'"
            style="max-width: 400px;"
            label="Numer NIP *"
            v-model="order.company.nip"
            required
          />
        </div>

        <div v-else>
          <mdb-input
            bg
            m="y0"
            style="max-width: 400px;"
            label="Adres (ulica i nr budynku/nr lokalu) *"
            v-model="order.user.address"
            required
          />
          <mdb-input
            bg
            m="y0"
            v-mask="'##-###'"
            style="max-width: 400px;"
            label="Kod pocztowy *"
            v-model="order.user.zip"
            required
          />
          <mdb-input
            bg
            m="y0"
            style="max-width: 400px;"
            label="Miejscowość *"
            v-model="order.user.city"
            required
          />
        </div>

        <hr class="my-5" />

        <h4 class="mt-5 mb-4">Sposób dostawy <span class="text-muted">*</span></h4>
        <div v-for="delivery in deliveries" :key="delivery.form">
          <p-radio
            @change="setDelivery"
            class="p-default"
            name="delivery"
            color="warning-o"
            v-model="order.delivery.form"
            :value="delivery.form"
            required
            ><i class="icon mdi mdi-check" slot="extra"></i> {{ delivery.form }}
            <span class="badge-warning p-1 ml-2">{{ delivery.price }} zł</span></p-radio
          >
        </div>

        <div v-if="order.delivery.form === 'Paczkomaty InPost'">
          <div id="easypack-map"></div>
        </div>

        <hr class="my-5" />

        <h4 class="mt-5 mb-4">Adres dostawy <span class="text-muted"></span></h4>

        <div v-if="order.delivery.form === 'Paczkomaty InPost'">
          <mdb-input
            style="max-width: 400px;"
            id="delivery-address-section"
            bg
            m="y0"
            label="Paczkomat"
            v-model="order.delivery.name"
            disabled
            required
          >
            <input class="inpost-hidden-input" v-model="order.delivery.name" required />
          </mdb-input>
          <mdb-input
            style="max-width: 400px;"
            bg
            m="y0"
            label="Adres"
            v-model="order.delivery.address"
            disabled
            required
          >
            <input class="inpost-hidden-input" v-model="order.delivery.address" required />
          </mdb-input>
          <mdb-input
            style="max-width: 400px;"
            bg
            m="y0"
            label="Kod pocztowy"
            v-model="order.delivery.zip"
            disabled
            required
          >
            <input class="inpost-hidden-input" v-model="order.delivery.zip" required />
          </mdb-input>
          <mdb-input
            style="max-width: 400px;"
            bg
            m="y0"
            label="Miejscowość"
            v-model="order.delivery.city"
            disabled
            required
          >
            <input class="inpost-hidden-input" v-model="order.delivery.city" required />
          </mdb-input>
        </div>

        <div v-if="deliveryPicked && order.delivery.form !== 'Paczkomaty InPost'" class="mt-3">
          <button
            type="button"
            @click="loadDeliveryFromUserData"
            v-if="
              order.user.name &&
                order.user.lastname &&
                order.user.address &&
                order.user.zip &&
                order.user.city &&
                !order.invoice
            "
            class="mb-4 p-2"
          >
            <strong>Użyj danych zamawiającego:</strong>
            <span class="text-muted small mb-0"
              >{{ order.user.name }} {{ order.user.lastname }}, {{ order.user.address }}
              {{ order.user.zip }} {{ order.user.city }}</span
            >
          </button>

          <button
            type="button"
            @click="loadDeliveryFromUserData"
            v-if="
              order.user.name &&
                order.user.lastname &&
                order.company.address &&
                order.company.zip &&
                order.company.city &&
                order.invoice
            "
            class="mb-4 p-2"
          >
            <strong>Użyj danych zamawiającego:</strong>
            <span class="text-muted small mb-0"
              >{{ order.user.name }} {{ order.user.lastname }}, {{ order.company.address }}
              {{ order.company.zip }} {{ order.company.city }}</span
            >
          </button>

          <mdb-input
            style="max-width: 400px;"
            bg
            m="y0"
            label="Odbiorca (imię i nazwisko) *"
            v-model="order.delivery.name"
            required
          />
          <mdb-input
            style="max-width: 400px;"
            bg
            m="y0"
            label="Adres (ulica i nr budynku/nr lokalu) *"
            v-model="order.delivery.address"
            required
          />
          <mdb-input
            v-mask="'##-###'"
            style="max-width: 400px;"
            bg
            m="y0"
            label="Kod pocztowy *"
            v-model="order.delivery.zip"
            required
          />
          <mdb-input
            style="max-width: 400px;"
            bg
            m="y0"
            label="Miejscowość *"
            v-model="order.delivery.city"
            required
          />
        </div>

        <div v-if="!deliveryPicked" class="text-info">
          Najpierw wybierz sposób dostawy
        </div>

        <hr class="my-5" />

        <h4 class="mt-5 mb-4">Zgody <span class="text-muted"></span></h4>

        <div class="mb-2">
          <a href="/regulamin" target="_blank"><button type="button">Regulamin</button></a
          ><a href="/polityka-prywatnosci" target="_blank"
            ><button type="button">Polityka prywatności</button></a
          >
        </div>
        <p-check
          class="p-default"
          name="termsCheck"
          color="warning-o"
          v-model="termsCheck1"
          required
          ><i class="icon mdi mdi-check" slot="extra"></i> Zapoznałem/am się z regulaminem oraz
          polityką prywatności i akceptuję postanowienia tych dokumentów. *</p-check
        >
        <p-check
          class="p-default mb-3"
          name="policyCheck"
          color="warning-o"
          v-model="termsCheck2"
          required
          >Dane osobowe podane w formularzu będą przetwarzane w celu założenia i utrzymywania konta
          użytkownika, a ich administratorem będzie Mikołaj Smoleński, prowadzący działalność
          gospodarczą pod firmą "WEBICO Mikołaj Smoleński", ul. Płk. Zoltana Balo 4/13, 02-793
          Warszawa, Polska, NIP: 9512464782. Szczegóły związane z przetwarzaniem danych znajdziesz w
          polityce prywatności. *</p-check
        >

        <button type="submit" class="main mt-5">Przejdź do podsumowania</button>
        <button type="button" class="second" @click="cancelOrder">Powrót do koszyka</button>
      </form>

      <div v-else>
        <div class="card px-4">
          <h3 class="mt-4 mb-5">Podsumowanie zamówienia</h3>
          <mdb-row>
            <mdb-col sm="4">
              <h6 class="mt-4 mb-2">Dane zamawiającego</h6>
              <div v-if="order.invoice">
                <div>{{ order.company.name }}</div>
                <div>
                  {{ order.company.address }}, {{ order.company.zip }} {{ order.company.city }}
                </div>
                <div>NIP: {{ order.company.nip }}</div>
                <i class="fas fa-check mt-2 text-warning pr-2"></i>Faktura na firmę
              </div>

              <div v-else>
                <div>{{ order.user.name }} {{ order.user.lastname }}</div>
                <div>{{ order.user.address }}, {{ order.user.zip }} {{ order.user.city }}</div>
                <div>tel. {{ order.user.phone }}</div>
              </div>
            </mdb-col>

            <mdb-col sm="4">
              <h6 class="mt-4 mb-2">Sposób dostawy</h6>
              <div>{{ order.delivery.form }}</div>
            </mdb-col>

            <mdb-col sm="4">
              <h6 class="mt-4 mb-2">Dane do wysyłki</h6>
              <div>{{ order.delivery.name }}</div>
              <div>
                {{ order.delivery.address }}, {{ order.delivery.zip }} {{ order.delivery.city }}
              </div>
            </mdb-col>
          </mdb-row>

          <h6 class="mt-5 mb-2">Szczegóły zamówienia</h6>
          <div class="table-responsive mt-4">
            <table class="table">
              <thead>
                <tr>
                  <th>Pozycja</th>
                  <th>Cena (szt.)</th>
                  <th>Ilość</th>
                  <th>Wartość</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(map, key) in order.cart" :key="key">
                  <td>Plakat w formacie {{ map.format }}cm</td>
                  <td>
                    <strike
                      class="text-muted pr-2"
                      v-if="map.itemPrice !== map.itemPriceWithDiscount"
                      >{{ map.itemPrice }} zł<br /></strike
                    ><span>{{ map.itemPriceWithDiscount }}</span> zł
                  </td>
                  <td>{{ map.items }}</td>
                  <td>
                    <strike class="text-muted pr-2" v-if="map.price !== map.priceWithDiscount"
                      >{{ map.price }} zł<br /></strike
                    ><span class="font-weight-bold">{{ map.priceWithDiscount }} zł</span>
                  </td>
                </tr>
                <tr>
                  <td>Dostawa: {{ order.overall.delivery }}</td>
                  <td colspan="2"></td>
                  <td>
                    <span class="font-weight-bold">{{ order.overall.deliveryPrice }} zł</span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td v-if="order.overall.discountCode" colspan="2">
                    Kod rabatowy: {{ order.overall.discountCode }}
                  </td>
                  <td v-else colspan="2"></td>
                  <td class="text-right">Suma:</td>
                  <td>
                    <strike
                      class="text-muted pr-2"
                      v-if="order.overall.overallPrice !== order.overall.overallPriceWithDiscount"
                      >{{ order.overall.overallPriceWithDelivery }} zł</strike
                    >
                    <h3 class="font-weight-bold text-large">
                      {{ order.overall.overallPriceWithDiscountAndDelivery }} zł
                    </h3>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <button class="main mt-5 order-with-payment-button" disabled>
          Zamawiam z obowiązkiem zapłaty
        </button>
        <button type="button" class="second" @click="editOrder">Poprzedni krok</button>
        <button type="button" class="second" @click="cancelOrder">Powrót do koszyka</button>
      </div>
    </mdb-container>

    <mdb-footer />
  </div>
</template>

<script>
import axios from "axios";
import mdbContainer from "mdbvue/lib/components/mdbContainer";
import mdbRow from "mdbvue/lib/components/mdbRow";
import mdbCol from "mdbvue/lib/components/mdbCol";
import mdbInput from "mdbvue/lib/components/mdbInput";
import mdbFooter from "../components/Footer";

export default {
  name: "order",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbInput,
    mdbFooter
  },
  data() {
    return {
      order: {
        user: {},
        delivery: {},
        company: {},
        invoice: false,
        cart: [],
        overall: []
      },
      deliveryPicked: false,
      editingOrder: true,
      deliveries: {},
      termsCheck1: false,
      termsCheck2: false
    };
  },
  mounted() {
    this.loadOrder();
  },
  methods: {
    loadOrder() {
      this.$store.commit("loadingOn");

      axios
        .get("/api/get/deliveries")
        .then(response => {
          this.deliveries = response.data.delivery;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.$store.commit("loadingOff");
        });
    },
    setDelivery(value) {
      this.deliveryPicked = true;

      this.$set(this.order.delivery, "name", "");
      this.$set(this.order.delivery, "address", "");
      this.$set(this.order.delivery, "zip", "");
      this.$set(this.order.delivery, "city", "");

      if (value === "Paczkomaty InPost") this.loadInpostWidget();
    },
    loadDeliveryFromUserData() {
      this.$set(this.order.delivery, "name", `${this.order.user.name} ${this.order.user.lastname}`);
      if (this.order.invoice) {
        this.$set(this.order.delivery, "address", this.order.company.address);
        this.$set(this.order.delivery, "zip", this.order.company.zip);
        this.$set(this.order.delivery, "city", this.order.company.city);
      } else {
        this.$set(this.order.delivery, "address", this.order.user.address);
        this.$set(this.order.delivery, "zip", this.order.user.zip);
        this.$set(this.order.delivery, "city", this.order.user.city);
      }
    },
    loadInpostWidget() {
      // eslint-disable-next-line
      easyPack.init({
        defaultLocale: "pl",
        points: {
          types: ["parcel_locker"]
        },
        map: {
          initialTypes: ["parcel_locker"]
        }
      });
      // eslint-disable-next-line
      const map = easyPack.mapWidget("easypack-map", point => {
        this.$set(this.order.delivery, "name", point.name);
        this.$set(
          this.order.delivery,
          "address",
          `${point.address_details.street} ${point.address_details.building_number}`
        );
        this.$set(this.order.delivery, "zip", point.address_details.post_code);
        this.$set(this.order.delivery, "city", point.address_details.city);

        document.getElementById("delivery-address-section").scrollIntoView({
          behavior: "smooth"
        });
      });
    },
    cancelOrder() {
      this.$store.commit("toggleOrderStatus", false);
      this.$router.push("cart");
    },
    editOrder() {
      this.editingOrder = true;
    },
    loadCart() {
      this.$store.commit("loadingOn");

      axios
        .get("/api/get/cart")
        .then(response => {
          if (response.data.pass) {
            this.order.cart = [];
            for (const key in response.data.cart) {
              this.order.cart.push({
                name: response.data.cart[key].name,
                token: response.data.cart[key].token,
                preview: response.data.cart[key].preview,
                editorData:
                  response.data.cart[key].editorData !== ""
                    ? JSON.parse(response.data.cart[key].editorData)
                    : null,
                created: response.data.cart[key].created,
                format: response.data.cart[key].format,
                itemPrice: response.data.cart[key].itemPrice,
                itemPriceWithDiscount: response.data.cart[key].itemPriceWithDiscount,
                items: response.data.cart[key].items,
                price: response.data.cart[key].price,
                priceWithDiscount: response.data.cart[key].priceWithDiscount,
                discount: response.data.cart[key].discount
              });
            }
            this.order.overall = response.data.order;

            // analytics ecommerce
            const currentDate = new Date();
            const analyticsOrderId = `${currentDate.getFullYear()}${(
              "0" +
              (currentDate.getMonth() + 1)
            ).slice(-2)}${("0" + currentDate.getDate()).slice(-2)}${(
              "0" + currentDate.getHours()
            ).slice(-2)}${("0" + currentDate.getMinutes()).slice(-2)}${(
              "0" + currentDate.getSeconds()
            ).slice(-2)}`;

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              transactionId: parseInt(analyticsOrderId),
              transactionTotal: parseFloat(this.order.overall.overallPriceWithDiscountAndDelivery),
              transactionShipping: parseFloat(this.order.overall.deliveryPrice)
            });
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.$store.commit("loadingOff");
        });
    },
    confirmOrder() {
      this.$store.commit("loadingOn");

      axios
        .post("/api/post/order", {
          delivery: this.order.delivery.form,
          invoice: this.order.invoice
        })
        .then(() => {
          this.loadCart();
          this.editingOrder = false;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
          this.$store.commit("loadingOff");
        });
    },
    pay() {
      this.$store.commit("loadingOn");

      axios
        .post("/api/post/pay", {
          order: JSON.stringify(this.order)
        })
        .then(response => {
          if (response.data.pass) {
            this.$store.commit("toggleOrderStatus", false);
            window.location.replace(response.data.redirect);
          } else {
            alert("Wystąpił błąd podczas składania zamówienia");
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.$store.commit("loadingOff");
        });
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  background-color: #eeeeee;
}
</style>

<style>
.easypack-widget {
  margin: 20px 0;
}
.easypack-widget .search-widget .search-input {
  outline: none;
}
.easypack-widget .search-group-btn button {
  margin: 0;
  box-shadow: none;
}
.inpost-hidden-input {
  position: absolute;
  bottom: 0;
  z-index: -5;
  border: none;
  width: 100%;
  color: white;
  text-align: right;
}
</style>
