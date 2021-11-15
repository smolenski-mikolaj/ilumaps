<template>
  <div class="skin">
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
        <div class="heading" :style="!editor.text && 'margin-top: 10px'">{{editor.heading}}</div>
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
      imgSize: 180
    }
  },
  mixins: [Layout]
}
</script>

<style scoped lang="scss">
@import '../../scss/mixins.scss';
@import url('https://fonts.googleapis.com/css?family=Baloo+Bhai&display=swap');

.skin {
  position: relative;
  padding: 1px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  font-family: 'Baloo Bhai', cursive;
  .bg-layer {
    @include iluAbsolutePosition;
    pointer-events: none;
    z-index: 2;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('../../assets/layout3.png');
  }
  .map-layer {
    width: 100%;
    height: 100%;
  }
  .icons-layer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content-layer {
    position: absolute;
    max-width: 80%;
    z-index: 5;
    left: -4px;
    top: 80px;
    pointer-events: none;
    background-color: rgba(197, 180, 143, 0.62);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    transform: rotate(-2deg);
    .content {
      position: relative;
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
      padding: 5px 20px 10px 80px;
      .heading {
        max-width: 100%;
        font-weight: 700;
        font-size: 50px;
        text-transform: uppercase;
      }
      .text {
        max-width: 100%;
        overflow: hidden;
        font-size: 20px;
        font-weight: 400;
        margin-top: -10px;
        text-transform: uppercase;
      }
    }
  }
  .content-image {
    position: absolute;
    right: -5%;
    bottom: -6.1%;
    height: 300px;
    width: 300px;
    z-index: 5;
    transform: rotate(-25deg);
    border-radius: 20px;
    .image {
      position: absolute;
      left: -20px;
      top: -60px;
      height: 100%;
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      pointer-events: all;
      cursor: move;
      transform: rotate(25deg);
    }
    .mask {
      pointer-events: none;
    }
  }
}

.map-attributions {
  right: auto;
  left: 5px;
}
</style>