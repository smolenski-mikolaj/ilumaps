<template>
  <div class="editor">
    <sidenav @save="save" />
    <div class="project-container" ref="plotContainer">
      <div class="row">
        <div class="project" ref="plot" :style="projectStyle">
          <div class="layout">
            <transition name="fade" mode="out-in">
              <Layout1 v-if="editor.layout === 1" />
              <Layout2 v-if="editor.layout === 2" />
              <Layout3 v-if="editor.layout === 3" />
              <Layout4 v-if="editor.layout === 4" />
              <Layout5 v-if="editor.layout === 5" />
              <Layout6 v-if="editor.layout === 6" />
              <Layout7 v-if="editor.layout === 7" />
              <Layout8 v-if="editor.layout === 8" />
              <Layout9 v-if="editor.layout === 9" />
              <Layout10 v-if="editor.layout === 10" />
              <Layout11 v-if="editor.layout === 11" />
            </transition>
          </div>

          <template v-if="editor.orientation === 'landscape'">
            <div class="horizontal-dimensions" data-html2canvas-ignore>
              {{ projectFormats[editor.format].y }} cm
            </div>
            <div class="vertical-dimensions" data-html2canvas-ignore>
              {{ projectFormats[editor.format].x }} cm
            </div>
          </template>
          <template v-else>
            <div class="horizontal-dimensions" data-html2canvas-ignore>
              {{ projectFormats[editor.format].x }} cm
            </div>
            <div class="vertical-dimensions" data-html2canvas-ignore>
              {{ projectFormats[editor.format].y }} cm
            </div>
          </template>

          <div class="editor-buttons">
            <button @click="mapZoom('in')" title="Przybliż"><i class="fas fa-plus"></i></button>
            <button @click="mapZoom('out')" title="Oddal"><i class="fas fa-minus"></i></button>
          </div>
        </div>
        <div class="terms">
          <a href="/regulamin" target="_blank">Regulamin</a> &#183;
          <a href="/polityka-prywatnosci" target="_blank">Polityka prywatności</a>
        </div>

        <div class="attributions">
          <a href="https://www.maptiler.com/license/maps/" target="_blank"
            ><i class="fas fa-copyright" aria-hidden="true"></i> MapTiler</a
          >
          <a href="https://www.openstreetmap.org/about/" target="_blank"
            ><i class="fas fa-copyright" aria-hidden="true"></i> OpenStreetMap contributors</a
          >
        </div>
      </div>
    </div>

    <button v-if="$store.state.user.id" @click="save" class="save-button">Dodaj do koszyka</button>
    <button
      v-else
      class="add-to-cart-login-redirect-button"
      @click="loginAlertModal = !loginAlertModal"
    >
      Dodaj do koszyka
    </button>

    <mdb-modal centered :show="loginAlertModal" @close="loginAlertModal = false">
      <mdb-modal-body class="text-center">
        <strong>Sklep zakończył działalność.</strong>
        <p class="mt-1 mb-0">Nie można już składać zamówień.</p>
      </mdb-modal-body>
    </mdb-modal>
  </div>
</template>

<script>
import Sidenav from "@/components/Sidenav";
import axios from "axios";
import html2canvas from "html2canvas";
import mdbModal from "mdbvue/lib/components/mdbModal";
import mdbModalBody from "mdbvue/lib/components/mdbModalBody";

import Layout1 from "@/components/layouts/Layout1.vue";
import Layout2 from "@/components/layouts/Layout2.vue";
import Layout3 from "@/components/layouts/Layout3.vue";
import Layout4 from "@/components/layouts/Layout4.vue";
import Layout5 from "@/components/layouts/Layout5.vue";
import Layout6 from "@/components/layouts/Layout6.vue";
import Layout7 from "@/components/layouts/Layout7.vue";
import Layout8 from "@/components/layouts/Layout8.vue";
import Layout9 from "@/components/layouts/Layout9.vue";
import Layout10 from "@/components/layouts/Layout10.vue";
import Layout11 from "@/components/layouts/Layout11.vue";

export default {
  name: "editor",
  components: {
    Sidenav,
    mdbModal,
    mdbModalBody,
    Layout1,
    Layout2,
    Layout3,
    Layout4,
    Layout5,
    Layout6,
    Layout7,
    Layout8,
    Layout9,
    Layout10,
    Layout11
  },
  data() {
    return {
      editor: this.$store.state.editor,
      projectScale: 1,
      projectFormats: {
        A4: { ratio: 0.7, x: 21, y: 30 },
        A3: { ratio: 0.75, x: 30, y: 40 },
        A2: { ratio: 0.8, x: 40, y: 50 },
        B2: { ratio: 0.71, x: 50, y: 70 },
        K1: { ratio: 1, x: 30, y: 30 },
        K2: { ratio: 1, x: 50, y: 50 }
      },
      plot: null,
      plotContainer: null,
      plotEdge: 1000,
      loginAlertModal: false
    };
  },
  computed: {
    projectStyle() {
      if (this.editor.orientation === "landscape") {
        return {
          width: this.plotEdge + "px",
          height: this.plotEdge * this.projectFormats[this.editor.format].ratio + "px",
          transform: `scale(${this.projectScale})`
        };
      } else {
        return {
          height: this.plotEdge + "px",
          width: this.plotEdge * this.projectFormats[this.editor.format].ratio + "px",
          transform: `scale(${this.projectScale})`
        };
      }
    }
  },
  methods: {
    mapZoom(direction) {
      this.$store.commit("mapZoom", direction);
    },
    resizeProject() {
      let mobileRatio = window.innerWidth <= 768 ? 0.02 : 0;
      if (this.editor.orientation === "landscape") {
        this.projectScale =
          Math.min(this.plotContainer.clientWidth - 40, this.plotContainer.clientHeight + 40) /
            this.plotEdge -
          mobileRatio;
      } else if (this.editor.orientation === "portrait") {
        this.projectScale =
          Math.min(this.plotContainer.clientWidth + 40, this.plotContainer.clientHeight - 60) /
            this.plotEdge -
          mobileRatio;
      } else {
        this.projectScale =
          Math.min(this.plotContainer.clientWidth - 40, this.plotContainer.clientHeight - 60) /
            this.plotEdge -
          mobileRatio;
      }
    },
    async save() {
      this.$store.commit("savingOn");

      window.scrollTo(0, 0);

      const options = {
        scale: window.innerWidth > 768 ? 8 : 16,
        logging: false,
        allowTaint: true,
        ignoreElements: element => {
          if (element.className.includes("editor-buttons")) return true;
          return false;
        }
      };

      const output = await html2canvas(this.plot, options);
      const base64Data = output.toDataURL("image/png").replace(/^data:image\/png;base64,/, "");

      if (this.editor.img) {
        axios({
          method: "get",
          url: this.editor.img,
          responseType: "blob"
        }).then(response => {
          var reader = new FileReader();
          reader.readAsDataURL(response.data);
          reader.onloadend = () => {
            const imgBase64Data = reader.result
              .replace(/^data:image\/jpeg;base64,/, "")
              .replace(/^data:image\/jpg;base64,/, "")
              .replace(/^data:image\/png;base64,/, "");
            axios
              .post("/api/post/mapSave", {
                name: this.editor.heading,
                format: this.editor.format,
                editorData: JSON.stringify(this.editor),
                base64Data,
                imgBase64Data
              })
              .then(response => {
                if (response.data === "maps_limit")
                  return alert(
                    "Osiągnięto limit projektów w koszyku. Usuń wybrane projekty, aby kontynuować."
                  );
                if (response.data === "img_size_error")
                  return alert("Błąd związany z niewłaściwym rozmiarem obrazka na mapie");
                this.$store.commit("toggleOrderStatus", false);
                this.$router.push("cart");
              })
              .catch(error => {
                console.log(error);
                return alert("Wystąpił błąd zapisu");
              })
              .finally(() => {
                this.$store.commit("savingOff");
              });
          };
        });
      } else {
        axios
          .post("/api/post/mapSave", {
            name: this.editor.heading,
            format: this.editor.format,
            editorData: JSON.stringify(this.editor),
            base64Data
          })
          .then(() => {
            this.$store.commit("toggleOrderStatus", false);
            this.$router.push("cart");
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.$store.commit("savingOff");
          });
      }
    }
  },
  mounted() {
    this.plot = this.$refs.plot;
    this.plotContainer = this.$refs.plotContainer;

    this.$nextTick(() => {
      this.resizeProject();
      window.addEventListener("resize", this.resizeProject);

      this.$store.subscribe(mutation => {
        if (mutation.type === "changeEditorData") {
          for (const key in mutation.payload) {
            this.editor[key] = mutation.payload[key];
            if (key === "orientation") {
              this.resizeProject();
            }
          }
        }
      });
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeProject);
  }
};
</script>

<style scoped lang="scss">
@import "../scss/mixins.scss";
@import "../scss/variables.scss";

.editor {
  position: relative;
  height: calc(100vh - 60px);
  .project-container {
    position: absolute;
    right: 0;
    top: 0;
    width: calc(100% - #{$sidenavWidth});
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f4f4f4;
    @media (max-width: 768px) and (orientation: portrait) {
      position: relative;
      height: 350px;
      width: 100%;
    }
    .project {
      background-color: white;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    }
    .horizontal-dimensions {
      position: absolute;
      z-index: -1;
      pointer-events: none;
      top: -40px;
      width: 100%;
      text-align: center;
      font-size: 20px;
      @media (max-width: 768px) {
        font-size: 40px;
        top: -60px;
      }
    }
    .vertical-dimensions {
      position: absolute;
      z-index: -1;
      pointer-events: none;
      top: 0;
      right: -38px;
      width: 35px;
      height: 100%;
      writing-mode: vertical-rl;
      text-orientation: sideways;
      text-align: center;
      font-size: 20px;
      @media (max-width: 768px) {
        font-size: 40px;
        right: -60px;
      }
    }
    .editor-buttons {
      position: absolute;
      left: -45px;
      top: 45%;
      width: 40px;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 26px;
      @media (max-width: 768px) {
        font-size: 50px;
        left: -70px;
        top: 40%;
        height: 200px;
      }
      button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (max-width: 768px) {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
  .terms {
    position: absolute;
    left: 5px;
    bottom: 5px;
    font-size: 10px;
    @media (max-width: 768px) {
      font-size: 9px;
    }
    a {
      color: black;
    }
  }
  .attributions {
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 10px;
    @media (max-width: 768px) {
      font-size: 9px;
    }
    a {
      color: black;
    }
  }
  .save-button,
  .add-to-cart-login-redirect-button {
    position: fixed;
    left: 0;
    bottom: 0;
    margin: 0;
    border: none;
    width: 400px;
    border-radius: 0;
    background-color: $iluColor;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    &:hover {
      opacity: 0.8;
    }
    @media (max-width: 768px) and (orientation: portrait) {
      position: relative;
      width: 100%;
    }
    @media (max-width: 768px) and (orientation: landscape) {
      width: 300px;
      height: 40px;
      font-size: 16px;
    }
  }
}

@media (max-width: 768px) and (orientation: landscape) {
  $sidenavWidth: 300px;
  .editor .project-container {
    width: calc(100% - #{$sidenavWidth});
  }
}
</style>

<style lang="scss">
.layout {
  position: relative;
  width: 100%;
  height: 100%;
  .icons-layer {
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.vdr {
  cursor: pointer;
  border: none;
  pointer-events: all;
}

@font-face {
  font-family: "FA5";
  src: url("../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2")
      format("woff2"),
    url("../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff")
      format("woff"),
    url("../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.eot") format("eot"),
    url("../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf") format("ttf"),
    url("../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.svg") format("svg");
}

.icons-layer .fas {
  font-family: FA5;
}

.map-attributions {
  position: absolute;
  font-family: "Ubuntu", Helvetica, Arial, sans-serif;
  right: 5px;
  bottom: 2px;
  z-index: 10;
  font-size: 9px;
  color: #ababab;
  .fas {
    font-family: FA5;
  }
}
</style>
