<template>
  <div class="skin skin-11">
    <div class="content-layer">
      <div class="heading" :style="!editor.text && 'margin-top: 30px'">{{editor.heading}}</div>
      <div class="text">{{editor.text}}</div>
      <div class="image-wrapper">
        <div class="image-layer" v-if="$store.state.editor.img">
          <div class="image" :style="imageStyle" @mousedown="imageMouseDown" @mousemove="imageMouseMove" @touchstart="imageTouchStart" @touchmove="imageTouchMove" @mouseup="imageMouseUp" @touchend="imageMouseUp"></div>
        </div>
      </div>
    </div>
    <div class="map-layer">
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
  name: 'layout11',
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
  .content-layer {
    position: absolute;
    left: 50px;
    top: 50px;
    z-index: 7;
    color: #252525;
    text-align: left;
    background: #ffffff;
    border-radius: 20px;
    padding: 20px 30px;
    border: 1px solid #c6c6c6;
    .heading {
      font-size: 26px;
      font-weight: 700;
    }
    .text {
      font-size: 20px;
    }
  }
  .image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .image-layer {
    margin-top: 20px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
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
}

.map-attributions {
  color: #b5b5b5;
}
</style>