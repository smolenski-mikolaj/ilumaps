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
    </div>
    <div class="map-attributions"><i class="fas fa-copyright" aria-hidden="true"></i> ilumaps <i class="fas fa-copyright" aria-hidden="true"></i> MapTiler <i class="fas fa-copyright" aria-hidden="true"></i> OpenStreetMap contributors</div>
  </div>
</template>

<script>
import MapLayer from '@/components/Map'
import mdbIcon from 'mdbvue/lib/components/mdbIcon'
import Layout from '../../mixins/Layout'

export default {
  name: 'layout6',
  components: {
    MapLayer,
    mdbIcon
  },
  data() {
    return {
      imgSize: 170
    }
  },
  mixins: [Layout]
}
</script>

<style scoped lang="scss">
@import '../../scss/mixins.scss';
@import url('https://fonts.googleapis.com/css?family=Joti+One&display=swap');

.skin {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: 'Joti One', cursive;
  .bg-layer {
    @include iluAbsolutePosition;
    pointer-events: none;
    z-index: 2;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('../../assets/layout6.png');
  }
  &.skin-no-img .bg-layer {
    background-image: url('../../assets/layout6_2.png');
  }
  .map-layer {
    position: absolute;
    width: 65%;
    height: 64%;
    left: 17%;
    top: 8%;
  }
  &.skin-no-img .map-layer {
    top: 13%;
    left: 14%;
    width: 72%;
    height: 72%;
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
    color: #c0003b;
  }
  .heading {
    position: absolute;
    z-index: 6;
    bottom: 10%;
    left: 16%;
    width: 60%;
    font-size: 36px;
    font-weight: 700;
    text-transform: uppercase;
  }
  &.skin-no-img .heading {
    left: 0;
    bottom: auto;
    top: 2%;
    width: 100%;
    text-align: center;
  }
  .text {
    position: absolute;
    z-index: 5;
    bottom: 6%;
    left: 22%;
    width: 60%;
    font-size: 20px;
    text-transform: uppercase;
  }
  &.skin-no-img .text {
    left: 0;
    bottom: 5%;
    width: 100%;
    text-align: center;
  }
  .content-image {
    position: absolute;
    right: 13%;
    bottom: 3%;
    height: 25%;
    width: 220px;
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