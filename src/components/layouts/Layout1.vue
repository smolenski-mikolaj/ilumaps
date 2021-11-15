<template>
  <div class="skin">
    <div class="bg-layer" :class="{'bg-layer-no-img' : !$store.state.editor.img}"></div>
    <div class="content-layer">
      <div class="heading" :style="!editor.text && 'margin-top: 30px'">{{editor.heading}}</div><br>
      <div class="text">{{editor.text}}</div>
    </div>
    <div class="map-layer" :class="{'map-layer-no-img' : !$store.state.editor.img}">
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
  name: 'layout1',
  components: {
    MapLayer,
    mdbIcon
  },
  data() {
    return {
      imgSize: 600
    }
  },
  mixins: [Layout]
}
</script>

<style scoped lang="scss">
@import '../../scss/mixins.scss';
@import url('https://fonts.googleapis.com/css?family=Righteous&display=swap');

.skin {
  font-family: 'Righteous', 'Ubuntu', cursive;
  .bg-layer {
    @include iluAbsolutePosition;
    pointer-events: none;
    z-index: 6;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('../../assets/layout1.png');
  }
  .bg-layer-no-img {
    background-image: url('../../assets/layout1_2.png');
  }
  .map-layer {
    position: absolute;
    top: 40px;
    right: 1px;
    width: 65%;
    height: calc(100% - 80px);
    &.map-layer-no-img {
      width: 97%;
    }
  }
  .icons-layer {
    position: absolute;
    top: 40px;
    right: 1px;
    width: 80%;
    height: calc(100% - 100px);
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #2a7585;
  }
  .image-layer {
    position: absolute;
    bottom: 7%;
    left: 2%;
    width: 35%;
    height: 58%;
    .image {
      height: 100%;
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      pointer-events: all;
      cursor: move;
    }
  }
  .content-layer {
    position: absolute;
    left: 50px;
    top: 60px;
    max-width: 45%;
    max-height: 50%;
    z-index: 7;
    color: #2a7585;
    .heading {
      display: inline-block;
      position: relative;
      font-size: 34px;
      text-transform: uppercase;
      &:before {
        content: '';
        position: absolute;
        display: block;
        width: 90%;
        height: 30%;
        bottom: 10px;
        right: -20px;
        z-index: -1;
        background-color: #d1ede8;
      }
    }
    .text {
      display: inline-block;
      position: relative;
      max-width: 100%;
      font-size: 18px;
      text-transform: uppercase;
      padding-left: 2px;
      &:before {
        content: '';
        position: absolute;
        display: block;
        width: 90%;
        height: 20%;
        bottom: 5px;
        right: -10px;
        z-index: -1;
        background-color: #d1ede8;
      }
    }
  }
}
</style>