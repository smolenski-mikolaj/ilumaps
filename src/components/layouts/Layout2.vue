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
    <div class="content-layer">
      <div class="content">
        <div class="heading" :style="!editor.text && 'margin-bottom: 35px'">{{editor.heading}}</div>
        <div class="text">{{editor.text}}</div>
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
  name: 'layout4',
  components: {
    MapLayer,
    mdbIcon
  },
  data() {
    return {
      imgSize: 120
    }
  },
  mixins: [Layout]
}
</script>

<style scoped lang="scss">
@import '../../scss/mixins.scss';
@import url('https://fonts.googleapis.com/css?family=Freckle+Face&display=swap');

.skin {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: 'Freckle Face', cursive;
  .bg-layer {
    @include iluAbsolutePosition;
    pointer-events: none;
    z-index: 6;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('../../assets/layout2.png');
  }
  &.skin-no-img .bg-layer {
    background-image: url('../../assets/layout2_2.png');
  }
  .map-layer {
    position: absolute;
    top: 3%;
    left: 5%;
    width: 90%;
    height: 70%;
  }
  .icons-layer {
    @include iluAbsolutePosition;
    color: white;
  }
  .content-layer {
    position: absolute;
    width: 100%;
    z-index: 10;
    left: 0;
    bottom: 250px;
    text-align: center;
    pointer-events: none;
    .content {
      .heading {
        max-width: 100%;
        font-weight: 700;
        font-size: 42px;
        text-transform: uppercase;
      }
      .text {
        margin-top: -15px;
        width: 100%;
        font-size: 30px;
        font-weight: 400;
      }
    }
  }
  &.skin-no-img .content-layer {
    bottom: 160px;
  }
  .image-layer {
    position: absolute;
    bottom: 30px;
    left: 30%;
    width: 40%;
    height: 210px;
    .image {
      height: 100%;
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      pointer-events: all;
      cursor: move;
    }
  }
}
</style>