<template>
  <div :class="loaderClass">
    <div class="card">
      <div v-if="saving" class="card-body">Trwa generowanie plakatu</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    saving: Boolean
  },
  computed: {
    loaderClass() {
      return [
        'loader',
        this.saving && 'saving'
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '../scss/variables.scss';

.loader {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 99999;
  &.saving {
    background-color: $iluColor2;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    .card {
      display: inline-block;
      border-radius: 20px;
      background-color: #787a86;
      color: $iluColor;
    }
  }
}
</style>