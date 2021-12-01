<template>
  <v-container> <Img /> </v-container>
</template>

<script>
import Img from '../components/Images/Img.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Home',

  components: { Img },
  data() {
    return {
      link: `${process.env.VUE_APP_BASE_URL}/image/`,
      overlay: false,
      currentImg: '',
      windowWidth: window.innerWidth,
      overlayImageSize: '300px',
      displayImages: {},
      currentPosition: 0,
    };
  },
  created() {
    this.fetchImages();
    this.fetchAlbums();
    if (this.windowWidth < 1250) {
      this.displayImages = this.images.splice(0, 6);
    } else if (this.windowWidth > 1250 && this.windowWidth < 1904) {
      this.displayImages = this.images.splice(0, 8);
    } else if (this.windowWidth > 1904) {
      this.displayImages = this.images.splice(0, 12);
    }
  },
  computed: {
    ...mapGetters({
      images: 'getImages',
      albums: 'getAlbums',
    }),
  },
  methods: {
    ...mapActions({
      fetchImages: 'fetchImages',
      fetchAlbums: 'fetchAlbums',
    }),
    showImg(id) {
      document.documentElement.style.overflow = 'hidden';
      if (this.windowWidth > 1904) {
        this.overlayImageSize = '900px';
      } else if (this.windowWidth < 1904 && this.windowWidth > 1264) {
        this.overlayImageSize = '700px';
      }
      this.overlay = true;
      this.currentImg = id;
    },
    closeImg() {
      this.currentPosition = 0;
      this.overlay = false;
      document.documentElement.style.overflow = 'auto';
    },
    prevImg() {
      try {
        const currentPosition = this.images
          .map(function (e) {
            return e.file_name;
          })
          .indexOf(this.currentImg);
        this.currentImg = this.images[currentPosition - 1].file_name;
      } catch (e) {
        this.currentImg = this.images[this.currentPosition].file_name;
      }
    },
    nextImg() {
      try {
        this.currentPosition = this.images
          .map(function (e) {
            return e.file_name;
          })
          .indexOf(this.currentImg);
        this.currentImg = this.images[this.currentPosition + 1].file_name;
      } catch (e) {
        this.currentImg = this.images[this.currentPosition].file_name;
      }
    },
  },
};
</script>
<style>
.activeIcon {
  background-color: red;
}
</style>
