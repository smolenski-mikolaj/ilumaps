<template>
  <mdb-container class="py-5">
    <h2>Login</h2>
    <form @submit.prevent>
      <mdb-row>
        <mdb-col sm="6">
          <mdb-input
            bg
            class="mb-0"
            name="email"
            type="email"
            v-model="loginForm.email"
            label="email"
            required
            disabled
          />
          <mdb-input
            bg
            class="mt-0"
            name="password"
            type="password"
            v-model="loginForm.pass"
            label="hasło"
            required
            disabled
          />
        </mdb-col>
      </mdb-row>
      <button disabled>Login</button>
    </form>

    <hr class="my-5" />

    <h2>Rejestracja nowego konta</h2>
    <p class="pt-2 text-success" v-if="registrationResponse.pass">
      {{ registrationResponse.pass }}
    </p>
    <div v-else>
      <form @submit.prevent>
        <mdb-row>
          <mdb-col sm="6">
            <mdb-input
              bg
              class="mb-0"
              type="email"
              v-model="registerForm.email"
              label="email"
              required
              disabled
            />
            <mdb-input
              bg
              class="my-0"
              type="password"
              v-model="registerForm.pass"
              label="hasło (min. 6 znaków)"
              required
              disabled
            />
            <mdb-input
              bg
              class="mt-0"
              type="password"
              v-model="registerForm.passConfirmation"
              label="powtórz hasło"
              required
              disabled
            />
            <div class="mb-2">
              <a href="/regulamin" target="_blank"><button type="button">Regulamin</button></a
              ><a href="/polityka-prywatnosci" target="_blank"
                ><button type="button">Polityka prywatności</button></a
              >
            </div>
            <p-check
              class="p-default mt-1"
              name="termsCheck"
              color="warning-o"
              v-model="registerForm.termsCheck"
              required
              ><i class="icon mdi mdi-check" slot="extra"></i> Zapoznałem/am się z regulaminem oraz
              polityką prywatności i akceptuję postanowienia tych dokumentów.</p-check
            >
            <p-check
              class="p-default mb-3"
              name="policyCheck"
              color="warning-o"
              v-model="registerForm.policyCheck"
              required
              >Dane osobowe podane w formularzu będą przetwarzane w celu założenia i utrzymywania
              konta użytkownika, a ich administratorem będzie Mikołaj Smoleński, prowadzący
              działalność gospodarczą pod firmą "WEBICO Mikołaj Smoleński", ul. Płk. Zoltana Balo
              4/13, 02-793 Warszawa, Polska, NIP: 9512464782. Szczegóły związane z przetwarzaniem
              danych znajdziesz w polityce prywatności.</p-check
            >
          </mdb-col>
        </mdb-row>
        <button disabled>Rejestruj</button>
      </form>
    </div>
    <p class="pt-2 text-danger" v-if="registrationResponse.failed">
      {{ registrationResponse.failed }}
    </p>

    <hr class="my-5" />

    <h2>Resetowanie hasła</h2>
    <form @submit.prevent>
      <mdb-row>
        <mdb-col sm="6">
          <p>Podaj swój adres email, aby zresetować hasło</p>
          <mdb-input
            bg
            type="email"
            v-model="passwordResetForm.email"
            label="email"
            required
            disabled
          />
        </mdb-col>
      </mdb-row>
      <button disabled>Potwierdzam</button>
    </form>
    <p class="pt-2 text-info" v-if="passwordResetForm.response">{{ passwordResetForm.response }}</p>
  </mdb-container>
</template>

<script>
import mdbContainer from "mdbvue/lib/components/mdbContainer";
import mdbRow from "mdbvue/lib/components/mdbRow";
import mdbCol from "mdbvue/lib/components/mdbCol";
import mdbInput from "mdbvue/lib/components/mdbInput";
import axios from "axios";

export default {
  name: "login",
  components: {
    mdbContainer,
    mdbInput,
    mdbRow,
    mdbCol
  },
  data() {
    return {
      loginForm: {
        email: "",
        pass: ""
      },
      registerForm: {
        email: "",
        pass: "",
        passConfirmation: "",
        termsCheck: false,
        policyCheck: false
      },
      registrationResponse: {
        pass: "",
        failed: ""
      },
      passwordResetForm: {
        email: "",
        response: ""
      }
    };
  },
  methods: {
    login() {
      this.$emit("login", this.loginForm);
    },
    register() {
      if (
        !this.registerForm.email ||
        !this.registerForm.pass ||
        !this.registerForm.passConfirmation ||
        !this.registerForm.termsCheck ||
        !this.registerForm.policyCheck
      ) {
        return alert("Wypełnij poprawnie formularz rejestracji");
      }
      if (this.registerForm.pass !== this.registerForm.passConfirmation) {
        return alert("Podane hasła nie są jednakowe");
      }
      if (this.registerForm.pass.length < 6) {
        return alert("Hasło musi zawierać co najmniej 6 znaków");
      }
      this.$store.commit("loadingOn");
      axios
        .post("/api/post/register", {
          email: this.registerForm.email,
          pass: this.registerForm.pass,
          passConfirmation: this.registerForm.passConfirmation
        })
        .then(response => {
          if (response.data.pass) {
            this.registrationResponse.pass = response.data.msg;
            this.registrationResponse.failed = null;
          } else {
            this.registrationResponse.failed = response.data;
            this.registrationResponse.pass = null;
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.$store.commit("loadingOff");
        });
    },
    passwordReset() {
      if (!this.passwordResetForm.email) return alert("Wypełnij poprawnie formularz");
      this.$store.commit("loadingOn");
      axios
        .post("/api/post/passwordReset", {
          email: this.passwordResetForm.email
        })
        .then(response => {
          if (response.data.pass) {
            this.passwordResetForm.response = response.data.msg;
          } else {
            this.passwordResetForm.response = response.data;
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

<style lang="scss">
@import "../scss/variables.scss";

.pretty {
  white-space: unset;
  line-height: unset;
  font-size: 14px;
  margin-bottom: 10px;
}

.pretty .state label:after,
.pretty .state label:before {
  top: 0;
}

.pretty input:focus ~ .state label:before {
  border-color: $iluColor;
}
</style>
