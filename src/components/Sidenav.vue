<template>
  <div class="sidenav">
    <form
      autocomplete="off"
      v-click-outside="hideSearchResults"
      @submit.prevent
      class="search-form"
    >
      <mdb-input
        class="m-0"
        bg
        @input.native="search"
        @click.native="searchResultsActive = true"
        label="Lokalizacja"
      />
      <ul v-if="searchResults && searchResultsActive" class="list-unstyled search-list">
        <li
          v-for="(result, key) in searchResults"
          :key="key"
          @click="moveToLocation(result.center)"
        >
          {{ result.place_name }}
        </li>
      </ul>
    </form>

    <nav>
      <button
        @click="activeSection = 1"
        :class="{ active: activeSection === 1 }"
        class="section-change-button section-style"
      >
        <div><mdb-icon icon="paint-brush" /></div>
        <span>Styl</span>
      </button>
      <button
        @click="activeSection = 2"
        :class="{ active: activeSection === 2 }"
        class="section-change-button section-description"
      >
        <div><mdb-icon icon="font" /></div>
        <span>Opis</span>
      </button>
      <button
        @click="activeSection = 3"
        :class="{ active: activeSection === 3 }"
        class="section-change-button section-format"
      >
        <div><mdb-icon icon="expand" /></div>
        <span>Format</span>
      </button>
    </nav>

    <div class="sidenav-content">
      <section v-if="activeSection === 1">
        <button
          :class="{ active: $store.state.editor.layout === 1 }"
          @click="
            $store.commit('changeEditorData', { layout: 1, format: 'A3', orientation: 'landscape' })
          "
          class="layout-btn layout1-btn"
        ></button>
        <button
          :class="{ active: $store.state.editor.layout === 7 }"
          @click="
            $store.commit('changeEditorData', { layout: 7, format: 'A3', orientation: 'portrait' })
          "
          class="layout-btn layout7-btn"
        ></button>
        <button
          :class="{ active: $store.state.editor.layout === 10 }"
          @click="
            $store.commit('changeEditorData', { layout: 10, format: 'A3', orientation: 'portrait' })
          "
          class="layout-btn layout10-btn"
        ></button>
        <button
          :class="{ active: $store.state.editor.layout === 11 }"
          @click="
            $store.commit('changeEditorData', { layout: 11, format: 'A3', orientation: 'portrait' })
          "
          class="layout-btn layout11-btn"
        ></button>
        <button
          :class="{ active: $store.state.editor.layout === 8 }"
          @click="
            $store.commit('changeEditorData', { layout: 8, format: 'A3', orientation: 'portrait' })
          "
          class="layout-btn layout8-btn"
        ></button>
        <button
          :class="{ active: $store.state.editor.layout === 9 }"
          @click="
            $store.commit('changeEditorData', { layout: 9, format: 'A3', orientation: 'landscape' })
          "
          class="layout-btn layout9-btn"
        ></button>
        <button
          :class="{ active: $store.state.editor.layout === 2 }"
          @click="
            $store.commit('changeEditorData', { layout: 2, format: 'A3', orientation: 'portrait' })
          "
          class="layout-btn layout2-btn"
        ></button>
        <button
          :class="{ active: $store.state.editor.layout === 3 }"
          @click="
            $store.commit('changeEditorData', { layout: 3, format: 'A3', orientation: 'landscape' })
          "
          class="layout-btn layout3-btn"
        ></button>
        <button
          :class="{ active: $store.state.editor.layout === 4 }"
          @click="
            $store.commit('changeEditorData', { layout: 4, format: 'A3', orientation: 'landscape' })
          "
          class="layout-btn layout4-btn"
        ></button>
        <button
          :class="{ active: $store.state.editor.layout === 5 }"
          @click="
            $store.commit('changeEditorData', { layout: 5, format: 'A3', orientation: 'landscape' })
          "
          class="layout-btn layout5-btn"
        ></button>
        <button
          :class="{ active: $store.state.editor.layout === 6 }"
          @click="
            $store.commit('changeEditorData', { layout: 6, format: 'A3', orientation: 'landscape' })
          "
          class="layout-btn layout6-btn"
        ></button>
      </section>

      <section v-if="activeSection === 2">
        <mdb-input
          bg
          class="my-0 p-0"
          :value="$store.state.editor.heading"
          @input.native="$store.commit('changeEditorData', { heading: $event.target.value })"
          maxlength="20"
          label="Tytuł"
          inputClass="heading-edit-input"
        />
        <mdb-input
          bg
          class="mt-0 mb-1"
          :value="$store.state.editor.text"
          @input.native="$store.commit('changeEditorData', { text: $event.target.value })"
          maxlength="40"
          label="Podtytuł"
          inputClass="text-edit-input"
        />

        <switches
          v-model="imgSwitch"
          :type-bold="true"
          theme="bootstrap"
          color="warning"
        ></switches>
        <vue-files-dropper
          class="switch-content"
          v-if="imgSwitch"
          v-model="file"
          @change="changeImg"
          accept="image/*"
          ><span v-if="file">{{ file.name }}</span
          ><span v-else>Dodaj własne zdjęcie</span></vue-files-dropper
        >
        <div class="switch-content text-muted" v-else>Dodaj zdjęcie</div>

        <switches
          v-model="iconSwitch"
          :type-bold="true"
          theme="bootstrap"
          color="warning"
        ></switches>
        <div class="switch-content">
          <template v-if="iconSwitch">
            <mdb-icon
              icon="home"
              class="icon-button px-1"
              :class="{ active: $store.state.editor.icon === 'home' }"
              @click.native="$store.commit('changeEditorData', { icon: 'home' })"
            />
            <mdb-icon
              icon="map-marker-alt"
              class="icon-button px-1"
              :class="{ active: $store.state.editor.icon === 'map-marker-alt' }"
              @click.native="$store.commit('changeEditorData', { icon: 'map-marker-alt' })"
            />
            <mdb-icon
              icon="bed"
              class="icon-button px-1"
              :class="{ active: $store.state.editor.icon === 'bed' }"
              @click.native="$store.commit('changeEditorData', { icon: 'bed' })"
            />
            <mdb-icon
              icon="heart"
              class="icon-button px-1"
              :class="{ active: $store.state.editor.icon === 'heart' }"
              @click.native="$store.commit('changeEditorData', { icon: 'heart' })"
            />
            <mdb-icon
              icon="star"
              class="icon-button px-1"
              :class="{ active: $store.state.editor.icon === 'star' }"
              @click.native="$store.commit('changeEditorData', { icon: 'star' })"
            />
            <mdb-icon
              icon="coffee"
              class="icon-button px-1"
              :class="{ active: $store.state.editor.icon === 'coffee' }"
              @click.native="$store.commit('changeEditorData', { icon: 'coffee' })"
            />
          </template>
          <template v-else>
            <mdb-icon icon="home" class="px-1 text-muted" />
            <mdb-icon icon="map-marker-alt" class="px-1 text-muted" />
            <mdb-icon icon="bed" class="px-1 text-muted" />
            <mdb-icon icon="heart" class="px-1 text-muted" />
            <mdb-icon icon="star" class="px-1 text-muted" />
            <mdb-icon icon="coffee" class="px-1 text-muted" />
          </template>
        </div>
      </section>

      <section v-if="activeSection === 3">
        <button
          :class="{ active: $store.state.editor.format === 'A4' }"
          class="format-change-button a4-format-button"
          @click="$store.commit('changeEditorData', { format: 'A4' })"
        >
          21<small>x</small>30 <small>cm</small>
        </button>
        <button
          :class="{ active: $store.state.editor.format === 'A3' }"
          class="format-change-button a3-format-btn"
          @click="$store.commit('changeEditorData', { format: 'A3' })"
        >
          30<small>x</small>40 <small>cm</small>
        </button>
        <button
          :class="{ active: $store.state.editor.format === 'A2' }"
          class="format-change-button a2-format-button"
          @click="$store.commit('changeEditorData', { format: 'A2' })"
        >
          40<small>x</small>50 <small>cm</small>
        </button>
        <button
          :class="{ active: $store.state.editor.format === 'B2' }"
          class="format-change-button b2-format-button"
          @click="$store.commit('changeEditorData', { format: 'B2' })"
        >
          50<small>x</small>70 <small>cm</small>
        </button>
      </section>

      <!-- <section v-if="activeSection === 4">
        <button @click="restoreDefaults"><mdb-icon icon="redo" /></button>
      </section> -->
    </div>
  </div>
</template>

<script>
import mdbIcon from "mdbvue/lib/components/mdbIcon";
import mdbInput from "mdbvue/lib/components/mdbInput";
import ClickOutside from "vue-click-outside";
import axios from "axios";
import Switches from "vue-switches";

export default {
  name: "Sidenav",
  components: {
    mdbIcon,
    mdbInput,
    Switches
  },
  data() {
    return {
      activeSection: 1,
      searchResults: null,
      searchResultsActive: false,
      maptilerKey: process.env.VUE_APP_MAPTILER_KEY,
      imgSwitch: Boolean(this.$store.state.editor.img),
      iconSwitch: Boolean(this.$store.state.editor.icon),
      file: null,
      prices: []
    };
  },
  methods: {
    getPrices() {
      axios
        .get("/api/get/prices")
        .then(response => {
          if (response.data) {
            this.prices = response.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    search(e) {
      if (e.target.value.length > 2) {
        axios
          .get(`https://api.maptiler.com/geocoding/${e.target.value}.json?key=${this.maptilerKey}`)
          .then(response => {
            this.searchResults = response.data.features;
            this.searchResultsActive = true;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.searchResults = null;
      }
    },
    moveToLocation(center) {
      if (Array.isArray(center)) {
        this.$store.commit("changeEditorData", { mapCenter: center, mapZoom: 12 });
        this.searchResultsActive = false;
      }
    },
    hideSearchResults() {
      this.searchResultsActive = false;
    },
    changeImg() {
      if (!this.file) {
        this.imgSwitch = false;
        this.$store.commit("changeEditorData", { img: this.imgSwitch });
        return;
      }

      if (this.file.size > 3072 * 3072) {
        alert("Plik zbyt duży (powyzej 9MB)");
        return;
      }

      this.$store.commit("changeEditorData", { img: URL.createObjectURL(this.file) });
    },
    restoreDefaults() {
      localStorage.clear();
      location.reload();
    }
  },
  directives: {
    ClickOutside
  },
  // mounted() {
  //   this.getPrices();
  // },
  watch: {
    imgSwitch(newVal) {
      if (newVal) {
        if (this.file) {
          this.$store.commit("changeEditorData", { img: URL.createObjectURL(this.file) });
        } else {
          this.$store.commit("changeEditorData", { img: "img/example.jpg" });
        }
      } else {
        this.$store.commit("changeEditorData", { img: null });
        this.file = null;
      }
    },
    iconSwitch(newVal) {
      if (newVal) {
        this.$store.commit("changeEditorData", { icon: "home" });
      } else {
        this.$store.commit("changeEditorData", { icon: false });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/variables.scss";

.sidenav {
  float: left;
  width: $sidenavWidth;
  height: 100%;
  background: #fff;
  border-right: 1px solid #dddddd;
  nav {
    float: left;
    width: 80px;
    height: calc(100% - 48px);
    border-right: 1px solid #dddddd;
    padding-top: 8px;
    button {
      width: calc(100% - 20px);
      height: 60px;
      margin: 2px 10px;
      padding: 0;
      background: rgba(0, 0, 0, 0);
      border: none;
      border-radius: 10px;
      transition: all 0.2s;
      i {
        font-size: 20px;
      }
      span {
        font-size: 12px;
        text-transform: uppercase;
      }
      &:hover {
        background: #dcdcdc;
      }
      &:active,
      &.active {
        background: #eeeeee;
      }
      &:focus {
        outline: none;
      }
    }
  }
  .layout-btn {
    position: relative;
    width: 60px;
    height: 60px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 4px;
    margin-left: 4px;
    margin-bottom: 10px;
    &.active {
      border-color: #b38600;
    }
    &:hover {
      border-color: #676767;
    }
    &.layout1-btn {
      background-image: url("../assets/layout1_preview.jpg");
      background-position: left;
    }
    &.layout2-btn {
      background-image: url("../assets/layout2_preview.jpg");
      background-position: top;
    }
    &.layout3-btn {
      background-image: url("../assets/layout3_preview.jpg");
      background-position: left;
    }
    &.layout4-btn {
      background-image: url("../assets/layout4_preview.jpg");
    }
    &.layout5-btn {
      background-image: url("../assets/layout5_preview.jpg");
      background-position: right;
    }
    &.layout6-btn {
      background-image: url("../assets/layout6_preview.jpg");
    }
    &.layout7-btn {
      background-image: url("../assets/layout7_preview.jpg");
      background-position: top;
    }
    &.layout8-btn {
      background-image: url("../assets/layout8_preview.jpg");
      background-position: top;
    }
    &.layout9-btn {
      background-image: url("../assets/layout9_preview.jpg");
      background-position: top;
    }
    &.layout10-btn {
      background-image: url("../assets/layout10_preview.jpg");
      background-position: top;
    }
    &.layout11-btn {
      background-image: url("../assets/layout11_preview.jpg");
      background-position: top;
    }
  }
  .sidenav-content {
    float: left;
    width: calc(100% - 80px);
    height: calc(100% - 106px);
    padding: 10px 20px;
    overflow-y: auto;
  }
  .search-list {
    position: absolute;
    top: 48px;
    z-index: 100;
    background-color: #f0f0f0;
    border: 1px solid #b1b1b1;
    font-size: 14px;
    li {
      padding: 5px 10px;
      cursor: pointer;
      &:hover {
        color: #5a5a5a;
      }
    }
  }
  .text-orange {
    color: #c75e21;
  }
}

@media (max-width: 768px) and (orientation: portrait) {
  .sidenav {
    position: relative;
    height: auto;
    width: 100%;
    nav {
      width: 100%;
      height: 80px;
      text-align: center;
      border-bottom: 1px solid #dddddd;
      border-right: none;
      button {
        width: 60px;
        height: 60px;
      }
    }
    .sidenav-content {
      height: auto;
      width: 100%;
      background-color: white;
      border-bottom: 1px solid #dddddd;
      text-align: center;
    }
  }
}

@media (max-width: 768px) and (orientation: landscape) {
  $sidenavWidth: 300px;
  .sidenav {
    width: $sidenavWidth;
    nav {
      width: 60px;
      font-size: 10px;
      button {
        width: 40px;
        height: 50px;
        span {
          font-size: 10px;
        }
      }
    }
    .sidenav-content {
      width: calc(100% - 60px);
      height: calc(100% - 90px);
      padding: 10px;
      font-size: 14px;
    }
  }
}
</style>

<style lang="scss">
@import "../scss/variables.scss";
.sidenav {
  .search-form {
    position: relative;
    input {
      border-radius: 0 !important;
      margin-bottom: 0;
      background-color: #fff !important;
    }
  }

  .v-files-dropper:not(.disabled).hover,
  .v-files-dropper:not(.disabled):hover {
    background: rgba(0, 0, 0, 0.1);
  }
  .v-files-dropper__clear {
    display: none;
  }

  .vue-switcher {
    margin-bottom: 0;
  }
  .vue-switcher input {
    height: auto;
  }
  .vue-switcher--bold div {
    top: 0;
    height: 45px;
    width: 60px;
    &:before {
      content: "";
      position: absolute;
      left: 8px;
      width: 44px;
      height: 20px;
      border-radius: 20px;
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
  .vue-switcher-theme--bootstrap.vue-switcher-color--warning div {
    background-color: #b3860080;
    border: 1px solid #ced4da;
    border-right: none;
  }
  .vue-switcher-theme--bootstrap.vue-switcher-color--warning.vue-switcher--unchecked div {
    background-color: #dcdcdc;
  }
  .vue-switcher-theme--bootstrap.vue-switcher-color--warning div {
    border-radius: 10px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .vue-switcher-theme--bootstrap.vue-switcher-color--warning div:after {
    background-color: white;
    border: 1px solid $iluColor2;
    height: 24px;
    width: 24px;
    margin-left: -28px;
    top: 9px;
  }
  .vue-switcher--bold--unchecked div:after {
    left: 32px;
  }
  .vue-switcher__label {
    font-size: 13px;
  }

  .switch-content {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: #f5f5f5;
    border-radius: 0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    width: calc(100% - 60px);
    float: right;
    height: 45px;
    min-height: 45px;
    max-height: 45px;
    overflow: hidden;
    padding: 0;
    font-size: initial;
    transition: all 0.2s;
    padding: 3px;
    font-size: 14px;
    color: rgb(42, 42, 42);
    span {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    i:not(.text-muted) {
      font-size: 20px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      &.active {
        color: #b38600;
      }
    }
  }
}
</style>
