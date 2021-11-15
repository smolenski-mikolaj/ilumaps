<template>
  <div>
    <main>
      <mdb-container>
        <section class="pt-4 pb-2">
          <mdb-row>
            <mdb-col md="5" class="d-flex justify-content-center align-items-center py-4">
              <div>
                <h2 class="mb-3">Witamy w <strong>ilumaps</strong></h2>
                <h1>Aplikacja ilumaps to <strong>kreator plakatów z mapą w tle</strong>, pozwalający na samodzielne tworzenie kompozycji zawierających zdjęcia, teksty i ikony.</h1>
                <router-link to="/editor"><button class="main mt-2">ROZPOCZNIJ</button></router-link>
              </div>
            </mdb-col>
            <mdb-col md="7" class="d-flex justify-content-center align-items-center py-4">
              <img v-lazy="require('../assets/slogan.png')" class="mockup" />
            </mdb-col>
          </mdb-row>
        </section>
        
        <section class="my-5 section-2">
          <mdb-row>
            <mdb-col md="7" class="second-md-col py-4">
              <img v-lazy="require('../assets/mockup1.png')" class="mockup" alt="Plakaty z mapą Nowego Jorku i Amsterdamu" />
            </mdb-col>
            <mdb-col md="5" class="d-flex justify-content-center align-items-center py-4">
              <div>
                <h3 class="mb-3">Poznaj style naszych map</h3>
                <p>Do stworzenia swojego spersonalizowanego plakatu możesz wybrać dowolny styl spośród kilkunastu oferowanych wariantów.</p>
                <div class="mt-4">
                  <img v-lazy="require('../assets/layout1_preview.jpg')" alt="Plakat z mapą w stylu wiosennym" class="preview" />
                  <img v-lazy="require('../assets/layout7_preview.jpg')" alt="Plakat z mapą w stylu wiosennym" class="preview" />
                  <img v-lazy="require('../assets/layout8_preview.jpg')" alt="Plakat z mapą w stylu wiosennym" class="preview" />
                  <img v-lazy="require('../assets/layout9_preview.jpg')" alt="Plakat z mapą w stylu wiosennym" class="preview" />
                  <img v-lazy="require('../assets/layout10_preview.jpg')" alt="Plakat z mapą w stylu wiosennym" class="preview" />
                  <img v-lazy="require('../assets/layout11_preview.jpg')" alt="Plakat z mapą w stylu wiosennym" class="preview" />
                  <img v-lazy="require('../assets/layout2_preview.jpg')" alt="Plakat z mapą w stylu wiosennym" class="preview" />
                  <img v-lazy="require('../assets/layout3_preview.jpg')" alt="Plakat z mapą w stylu wiosennym" class="preview" />
                  <img v-lazy="require('../assets/layout4_preview.jpg')" alt="Plakat z mapą w stylu wiosennym" class="preview" />
                  <img v-lazy="require('../assets/layout5_preview.jpg')" alt="Plakat z mapą w stylu wiosennym" class="preview" />
                  <img v-lazy="require('../assets/layout6_preview.jpg')" alt="Plakat z mapą w stylu wiosennym" class="preview" />
                </div>
              </div>
            </mdb-col>
          </mdb-row>
        </section>
        
        <section class="my-5">
          <mdb-row>
            <mdb-col md="5" class="d-flex justify-content-center align-items-center py-4">
              <div>
                <h3 class="mb-3">Dodawaj własne elementy</h3>
                <p>To co wyróżnia ilumaps, to możliwość umieszczenia w projekcie elementów użytkownika. Wstawiaj zdjęcia, teksty, wybieraj ikony – spraw, że Twoja mapa będzie niepowtarzalna.</p>
                <div class="mt-4">
                  <mdb-icon icon="home" size="2x" class="px-1 text-muted" />
                  <mdb-icon icon="map-marker-alt" size="2x" class="px-1" />
                  <mdb-icon icon="bed" size="2x" class="px-1 text-muted" />
                  <mdb-icon icon="heart" size="2x" class="px-1" />
                  <mdb-icon icon="star" size="2x" class="px-1 text-muted" />
                  <mdb-icon icon="coffee" size="2x" class="px-1" />
                </div>
              </div>
            </mdb-col>
            <mdb-col md="7" class="py-4">
              <img v-lazy="require('../assets/mockup2.png')" class="mockup" alt="Plakat z mapą Grecji" />
            </mdb-col>
          </mdb-row>
        </section>

        <section class="my-5">
          <mdb-row>
            <mdb-col md="7" class="second-md-col py-4">
              <img v-lazy="require('../assets/mockup3.png')" class="mockup" alt="Plakat z mapą Zakopanego" />
            </mdb-col>
            <mdb-col md="5" class="d-flex justify-content-center align-items-center py-4">
              <div>
                <h3 class="mb-3">Zachowaj wspomnienia</h3>
                <p>Wyjątkowe chwile to wyjątkowe miejsca. Oświadczyny, pierwsza randka, rodzinny dom, niezapomniana podróż, życiowy rekord - każdy z nas ma wspomnienia, do których szczególnie lubi powracać. Dzięki ilumaps zachowasz je w unikalnej formie plakatu-mapy.</p>
              </div>
            </mdb-col>
          </mdb-row>
        </section>
      </mdb-container>

      <section class="my-5 text-center">
        <router-link to="/editor"><button class="main mt-2">Stwórz swój pierwszy plakat</button></router-link>
      </section>
    </main>

    <mdb-footer />
  </div>
</template>

<script>
import mdbContainer from 'mdbvue/lib/components/mdbContainer'
import mdbRow from 'mdbvue/lib/components/mdbRow'
import mdbCol from 'mdbvue/lib/components/mdbCol'
import mdbIcon from 'mdbvue/lib/components/mdbIcon'
import mdbFooter from '../components/Footer'

export default {
  name: 'home',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbIcon,
    mdbFooter
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  padding-bottom: 10px;
}

main {
  position: relative;
  overflow-x: hidden;
  &:before {
    content: '';
    position: absolute;
    left: -20%;
    top: 10%;
    width: 80%;
    height: 40%;
    background: url('../assets/bg.png') no-repeat;
    background-size: contain;
    background-position: top;
    @media (max-width: 768px) {
      width: 130%;
    }
  }
  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    right: -20%;
    bottom: 10%;
    width: 80%;
    height: 40%;
    background: url('../assets/bg2.png') no-repeat;
    background-position: bottom;
    background-size: contain;
    @media (max-width: 768px) {
      width: 140%;
    }
  }
  @media (max-width: 768px) and (orientation: portrait) {
    text-align: center;
  }
  .mockup {
    width: 100%;
    height: auto;
  }
  .preview {
    width: 60px;
    height: 60px;
    object-fit: cover;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 50%;
    box-shadow: 0 0 3px #848484;
  }
  .second-md-col {
    @media (max-width: 768px) {
      order: 2;
    }
  }
}
</style>
