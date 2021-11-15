<template>
  <vl-map ref="map" class="map" data-projection="EPSG:4326" @created="onMapCreated" :key="mapKey" :pixel-ratio="1">
    <vl-view :zoom.sync="zoom" :center.sync="center" @update:center="updateMapCenter" @update:zoom="updateMapZoom" :rotation="0"></vl-view>
  </vl-map>
</template>

<script>
import olms from 'ol-mapbox-style'
import * as mapInteractions from 'ol/interaction'

export default {
  name: 'MapLayer',
  data() {
    return {
      zoom: this.$store.state.editor.mapZoom,
      center: this.$store.state.editor.mapCenter,
      mapKey: 0
    }
  },
  methods: {
    onMapCreated() {
      olms(this.$refs.map.$map, `./maps/${this.$store.state.editor.layout}.json`).then(() => {
        this.$refs.map.$map.getInteractions().forEach(interaction => {
          if (interaction instanceof mapInteractions.DragRotate || interaction instanceof mapInteractions.DoubleClickZoom || interaction instanceof mapInteractions.PinchRotate || interaction instanceof mapInteractions.MouseWheelZoom) {
            interaction.setActive(false)
          } 
        })
      })
      .then(() => {
        this.$store.commit('loadingOff')
      })
    },
    changeMap() {
      this.mapKey++;
    },
    updateMapCenter(val) {
      this.$store.commit('changeEditorData', {mapCenter: val})
    },
    updateMapZoom(val) {
      this.$store.commit('changeEditorData', {mapZoom: val})
    }
  },
  beforeCreate() {
    this.$store.commit('loadingOn')
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.subscribe(mutation => {
        if (mutation.type === 'changeEditorData' && (mutation.payload.hasOwnProperty('layout') || mutation.payload.hasOwnProperty('format') || mutation.payload.hasOwnProperty('img'))) {
          this.changeMap()
        }
        if (mutation.type === 'changeEditorData' && mutation.payload.hasOwnProperty('mapCenter') && mutation.payload.hasOwnProperty('mapZoom')) {
          this.center = mutation.payload.mapCenter
          this.zoom = mutation.payload.mapZoom
        }
        if (mutation.type === 'mapZoom') {
          if (mutation.payload === 'in') {
            this.zoom += 0.5
          }
          if (mutation.payload === 'out') {
            this.zoom -= 0.5
          }
        }
      })
    })
  }
}
</script>

<style lang="scss">
.map {
  transform: scale(0.5);
  transform-origin: 0 0;
  width: 200%;
  height: 200%;
  .ol-overlaycontainer-stopevent {
    display: none;
  }
}
</style>