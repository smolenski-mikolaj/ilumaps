<template>
  <div class="skin" :class="{'skin-no-img' : !$store.state.editor.img}">
    <div class="bg-layer"></div>
    <div class="map-layer">
      <map-layer ref="mapLayer" />
      <div class="icons-layer">
        <vue-draggable-resizable :w="60" :h="60" :x="editor.iconPosition[0]" :y="editor.iconPosition[1]" :parent="true" :resizable="false" v-if="editor.icon" @dragstop="updateIconPosition">
          <mdb-icon :icon="editor.icon" size="3x" />
        </vue-draggable-resizable>
      </div>
    </div>
    <div class="heading">{{editor.heading}}</div>
    <div class="text">{{editor.text}}</div>
    <div class="content-image view" v-if="$store.state.editor.img">
      <div class="image" :style="imageStyle" @mousedown="imageMouseDown" @mousemove="imageMouseMove" @touchstart="imageTouchStart" @touchmove="imageTouchMove" @mouseup="imageMouseUp" @touchend="imageMouseUp"></div>
      <div class="mask flex-center"></div>
    </div>
    <div class="map-attributions"><i class="fas fa-copyright" aria-hidden="true"></i> ilumaps <i class="fas fa-copyright" aria-hidden="true"></i> MapTiler <i class="fas fa-copyright" aria-hidden="true"></i> OpenStreetMap contributors</div>
  </div>
</template>

<script>
import MapLayer from '@/components/Map'
import mdbIcon from 'mdbvue/lib/components/mdbIcon'
import Layout from '../../mixins/Layout'

export default {
  name: 'layout5',
  components: {
    MapLayer,
    mdbIcon
  },
  data() {
    return {
      imgSize: 240
    }
  },
  mixins: [Layout]
}
</script>

<style scoped lang="scss">
@import '../../scss/mixins.scss';
@import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap');

.skin {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: 'Indie Flower', cursive;
  .bg-layer {
    @include iluAbsolutePosition;
    pointer-events: none;
    z-index: 2;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('../../assets/layout5.png');
  }
  &.skin-no-img .bg-layer {
    background-image: url('../../assets/layout5_2.png');
  }
  .map-layer {
    position: absolute;
    width: 53%;
    height: 90%;
    left: 4%;
    top: 5%
  }
  .icons-layer {
    @include iluAbsolutePosition;
    color: #6e8bc5;
  }
  .heading {
    position: absolute;
    z-index: 5;
    right: 6%;
    top: 56%;
    width: 34%;
    font-weight: 700;
    font-size: 32px;
  }
  &.skin-no-img .heading {
    top: 48%;
  }
  .text {
    position: absolute;
    z-index: 5;
    right: 6%;
    top: 64%;
    width: 34%;
    overflow: hidden;
    font-size: 32px;
    font-weight: 400;
    line-height: 70px;
  }
  &.skin-no-img .text {
    top: 57%;
  }
  .content-image {
    position: absolute;
    right: 5%;
    top: 7%;
    height: 330px;
    width: 370px;
    .image {
      position: absolute;
      height: 100%;
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      pointer-events: all;
      cursor: move;
    }
    .mask {
      pointer-events: none;
    }
  }
}
</style>
