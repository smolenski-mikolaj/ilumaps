<template>
  <div class="skin skin-10">
    <div class="content-layer">
      <div class="heading" :style="!editor.text && 'margin-top: 30px'">{{editor.heading}}</div>
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
    <div class="image-wrapper">
      <div class="image-layer" v-if="$store.state.editor.img">
        <div class="image" :style="imageStyle" @mousedown="imageMouseDown" @mousemove="imageMouseMove" @touchstart="imageTouchStart" @touchmove="imageTouchMove" @mouseup="imageMouseUp" @touchend="imageMouseUp"></div>
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
  name: 'layout10',
  components: {
    MapLayer,
    mdbIcon
  },
  data() {
    return {
      imgSize: 200
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
    height: 80%;
    padding: 50px;
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
    color: #252525;
  }
  .image-wrapper {
    position: absolute;
    top: 150px;
    left: 0;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  .image-layer {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    padding: 10px;
    background-color: #ffffff;
    &:before {
      box-sizing: content-box;
      content: '';
      position: absolute;
      z-index: 1;
      left: -1px;
      top: 100px;
      width: 200px;
      height: 100px;
      border: 1px solid #6f6f6f;
      border-top-width: 0;
      border-bottom-left-radius: 200px;
      border-bottom-right-radius: 200px;
    }
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
    top: 50px;
    z-index: 7;
    color: #252525;
    text-align: center;
    width: 100%;
    .heading {
      font-size: 38px;
      font-weight: 700;
    }
    .text {
      font-size: 26px;
      margin-top: -5px;
    }
  }
}

.map-attributions {
  color: #b5b5b5;
}
</style>

<style lang="scss">
.skin-10 .map, .skin-10 canvas, .skin-10 .ol-viewport {
  border-radius: 100px;
}
.skin-10 .map {
  border: 1px solid #252525;
}
</style>