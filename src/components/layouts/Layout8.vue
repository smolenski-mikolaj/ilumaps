<template>
  <div class="skin skin-8">
    <div class="content-layer" :style="contentStyle">
      <div class="d-flex justify-content-center">
        <div class="image-layer" v-if="$store.state.editor.img">
          <div class="image" :style="imageStyle" @mousedown="imageMouseDown" @mousemove="imageMouseMove" @touchstart="imageTouchStart" @touchmove="imageTouchMove" @mouseup="imageMouseUp" @touchend="imageMouseUp"></div>
        </div>
      </div>
      <div class="heading" :style="!editor.text && 'margin-top: 30px'">{{editor.heading}}</div>
      <div class="text">{{editor.text}}</div>
    </div>
    <div class="map-layer" :style="mapStyle">
      <map-layer ref="mapLayer" />
      <div class="icons-layer">
        <vue-draggable-resizable :w="60" :h="60" :x="editor.iconPosition[0]" :y="editor.iconPosition[1]" :parent="true" :resizable="false" v-if="editor.icon" @dragstop="updateIconPosition">
          <mdb-icon :icon="editor.icon" size="3x" />
        </vue-draggable-resizable>
      </div>
    </div>
    <div class="map-attributions"><i class="fas fa-copyright" aria-hidden="true"></i> ilumaps <i class="fas fa-copyright" aria-hidden="true"></i> MapTiler <i class="fas fa-copyright" aria-hidden="true"></i> OpenStreetMap contributors</div>
  </div>
</template>

<script>
import MapLayer from '@/components/Map'
import mdbIcon from 'mdbvue/lib/components/mdbIcon'
import Layout from '../../mixins/Layout'

export default {
  name: 'layout8',
  components: {
    MapLayer,
    mdbIcon
  },
  data() {
    return {
      imgSize: 120
    }
  },
  mixins: [Layout],
  computed: {
    contentStyle() {
      return {
        height: this.$store.state.editor.img ? '350px' : '170px'
      }
    },
    mapStyle() {
      return {
        height: this.$store.state.editor.img ? '70%' : '88%'
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../scss/mixins.scss';
@import url('https://fonts.googleapis.com/css?family=Poppins:400,600&display=swap');

.skin {
  font-family: 'Poppins', sans-serif;
  .map-layer {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 70%;
    padding: 50px;
  }
  .icons-layer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70%;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f66c59;
  }
  .content-layer {
    position: absolute;
    left: 50px;
    width: calc(100% - 100px);
    top: 50px;
    z-index: 4;
    text-align: center;
    color: #ffffff;
    background-color:#f66c59; 
    height: 350px;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    .image-layer {
      margin-top: 25px;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      z-index: 1;
      position: relative;
      .image {
        height: 100%;
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        pointer-events: all;
        border-radius: 50%;
        cursor: move;
      }
    }
    .heading {
      font-size: 44px;
      font-weight: 600;
      margin-top: 15px;
    }
    .text {
      margin-top: -10px;
      font-size: 20px;
    }
  }
}

.map-attributions {
  color: #b5b5b5;
}
</style>

<style lang="scss">
.skin-8 .map, .skin-8 canvas, .skin-8 .ol-viewport {
  border-radius: 100px;
}
</style>