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
        <div class="heading" :style="!editor.text && 'margin-top: 15px'">{{editor.heading}}</div>
        <div class="text">{{editor.text}}</div>
      </div>
    </div>
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
  name: 'layout4',
  components: {
    MapLayer,
    mdbIcon
  },
  data() {
    return {
      imgSize: 300
    }
  },
  mixins: [Layout]
}
</script>

<style scoped lang="scss">
@import '../../scss/mixins.scss';
@import url('https://fonts.googleapis.com/css?family=Special+Elite&display=swap');

.skin {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: 'Special Elite', cursive;
  .bg-layer {
    @include iluAbsolutePosition;
    pointer-events: none;
    z-index: 2;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('../../assets/layout4.png');
  }
  &.skin-no-img .bg-layer {
    background-image: url('../../assets/layout4_2.png');
  }
  .map-layer {
    position: absolute;
    width: 60%;
    height: 70%;
    left: 5%;
    top: 24%;
  }
  &.skin-no-img .map-layer {
    width: 90%;
  }
  .icons-layer {
    @include iluAbsolutePosition;
  }
  .content-layer {
    position: absolute;
    z-index: 5;
    left: 0;
    top: 10%;
    width: 100%;
    text-align: center;
    pointer-events: none;
    color: #4e4e4e;
    .content {
      position: relative;
      .heading {
        max-width: 100%;
        font-weight: 700;
        font-size: 40px;
        text-transform: uppercase;
      }
      .text {
        margin-top: -15px;
        max-width: 100%;
        overflow: hidden;
        font-size: 24px;
        font-weight: 400;
      }
    }
  }
  &.skin-no-img .content-layer {
    top: 13%;
    width: 80%;
  }
  .content-image {
    position: absolute;
    right: 4%;
    bottom: 7%;
    height: 300px;
    width: 300px;
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

.map-attributions {
  color: #535353;
}
</style>
