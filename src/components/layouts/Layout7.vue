<template>
  <div class="skin">
    <div class="content-layer">
      <div class="heading" :style="!editor.text && 'margin-top: 30px'">{{editor.heading}}</div><br>
      <div class="text">{{editor.text}}</div>
    </div>
    <div class="map-layer">
      <map-layer ref="mapLayer" />
      <div class="icons-layer">
        <vue-draggable-resizable :w="60" :h="60" :x="editor.iconPosition[0]" :y="editor.iconPosition[1]" :parent="true" :resizable="false" v-if="editor.icon" @dragstop="updateIconPosition">
          <mdb-icon :icon="editor.icon" size="3x" />
        </vue-draggable-resizable>
      </div>
    </div>
    <div class="image-layer" v-if="$store.state.editor.img">
      <div class="image" :style="imageStyle" @mousedown="imageMouseDown" @mousemove="imageMouseMove" @touchstart="imageTouchStart" @touchmove="imageTouchMove" @mouseup="imageMouseUp" @touchend="imageMouseUp"></div>
    </div>
    <div class="map-attributions"><i class="fas fa-copyright" aria-hidden="true"></i> ilumaps <i class="fas fa-copyright" aria-hidden="true"></i> MapTiler <i class="fas fa-copyright" aria-hidden="true"></i> OpenStreetMap contributors</div>
  </div>
</template>

<script>
import MapLayer from '@/components/Map'
import mdbIcon from 'mdbvue/lib/components/mdbIcon'
import Layout from '../../mixins/Layout'

export default {
  name: 'layout7',
  components: {
    MapLayer,
    mdbIcon
  },
  data() {
    return {
      imgSize: 150
    }
  },
  mixins: [Layout]
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
    width: 100%;
    height: 85%;
  }
  .icons-layer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 85%;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #313131;
  }
  .image-layer {
    position: absolute;
    bottom: 40px;
    left: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    z-index: 1;
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
  .content-layer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding-top: 50px;
    height: 200px;
    z-index: 7;
    text-align: center;
    color: #313131;
    &:before {
      content: '';
      display: block;
      position: absolute;
      z-index: -2;
      bottom: -180px;
      left: 0;
      width: 100%;
      height: 240px;
      background: linear-gradient(0deg, rgba(255,255,255,0) 0%,  rgba(255,255,255,0.6) 30%, rgba(255,255,255,1) 90%);
    }
    .heading {
      display: inline-block;
      position: relative;
      font-size: 50px;
      font-weight: 600;
    }
    .text {
      display: inline-block;
      position: relative;
      max-width: 100%;
      font-size: 32px;
      margin-top: -10px;
    }
  }
}

.map-attributions {
  color: #b5b5b5;
}
</style>