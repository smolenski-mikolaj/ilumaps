const Layout = {
  data() {
    return {
      editor: this.$store.state.editor,
      imgBackgroundPositionX: this.$store.state.editor.imgBackgroundPositionX,
      imgBackgroundPositionY: this.$store.state.editor.imgBackgroundPositionY,
      imgOriginalBackgroundPositionX: 0,
      imgOriginalBackgroundPositionY: 0,
      imgMouseIsDown: false,
      imgOrientation: 'landscape',
      newImgHeight: 0,
      newImgWidth: 0
    }
  },
  computed: {
    imageStyle() {
      return {
        backgroundImage: `url(${this.editor.img})`,
        backgroundPosition: `${this.imgBackgroundPositionX}px ${this.imgBackgroundPositionY}px`
      }
    }
  },
  mounted() {
    this.$store.subscribe(mutation => {
      if (mutation.type === 'changeEditorData' && mutation.payload.img) {
        this.updateImageMethods()
      }
    })
    if (this.editor.img) this.calculateImgSize()
  },
  methods: {
    imageMouseDown(e) {
      this.imgOriginalBackgroundPositionX = e.offsetX - this.imgBackgroundPositionX
      this.imgOriginalBackgroundPositionY = e.offsetY - this.imgBackgroundPositionY
      this.imgMouseIsDown = true
    },
    imageTouchStart(e) {
      this.imgOriginalBackgroundPositionX = e.touches[0].clientX - this.imgBackgroundPositionX
      this.imgOriginalBackgroundPositionY = e.touches[0].clientY - this.imgBackgroundPositionY
      this.imgMouseIsDown = true
    },
    imageMouseUp() {
      this.$store.commit('changeEditorData', {imgBackgroundPositionX: this.imgBackgroundPositionX, imgBackgroundPositionY: this.imgBackgroundPositionY})
      this.imgMouseIsDown = false
    },
    imageMouseMove(e) {
      if (this.imgMouseIsDown) {
        if (this.imgOrientation === 'landscape') {
          const newPositionX = e.offsetX - this.imgOriginalBackgroundPositionX
          if (newPositionX > 0 || newPositionX < -(this.newImgWidth - this.imgSize)) return
          this.imgBackgroundPositionX = newPositionX
        } else {
          const newPositionY = e.offsetY - this.imgOriginalBackgroundPositionY
          if (newPositionY > 0 || newPositionY < -(this.newImgHeight - this.imgSize)) return
          this.imgBackgroundPositionY = newPositionY
        }
      }
    },
    imageTouchMove(e) {
      if (this.imgMouseIsDown) {
        if (this.imgOrientation === 'landscape') {
          const newPositionX = e.touches[0].clientX - this.imgOriginalBackgroundPositionX
          if (newPositionX > 0 || newPositionX < -(this.newImgWidth - this.imgSize)) return
          this.imgBackgroundPositionX = newPositionX
        } else {
          const newPositionY = e.touches[0].clientY - this.imgOriginalBackgroundPositionY
          if (newPositionY > 0 || newPositionY < -(this.newImgHeight - this.imgSize)) return
          this.imgBackgroundPositionY = newPositionY
        }
      }
    },
    calculateImgSize() {
      let image = new Image()
      image.src = this.editor.img

      image.onerror = () => {
        image = new Image()
        this.clearImgPosition()
        this.editor.img = 'img/example.jpg'
        image.src = this.editor.img
      }

      image.onload = () => {
        if (image.width > image.height) {
          let ratio = image.height / this.imgSize
          this.newImgWidth = image.width / ratio
          this.imgOrientation = 'landscape'
        } else {
          let ratio = image.width / this.imgSize
          this.newImgHeight = image.height / ratio
          this.imgOrientation = 'portrait'
        }
      }
    },
    clearImgPosition() {
      this.imgBackgroundPositionX = 0
      this.imgBackgroundPositionY = 0
      this.$store.commit('changeEditorData', {imgBackgroundPositionX: 0, imgBackgroundPositionY: 0})
    },
    updateImageMethods() {
      this.clearImgPosition()
      this.calculateImgSize()
    },
    updateIconPosition(x, y) {
      this.$store.commit('changeEditorData', {iconPosition: [x, y]})
    }
  }
}

export default Layout