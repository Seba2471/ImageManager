<template>
  <v-container>
    <div class="mt-5 ml-6">
      Moje albumy
      <v-divider class="mb-5" width="120px" />
    </div>
    <v-row class="mb-5" justify-center>
      <v-col cols="1" class="d-flex justify-end align-center"><v-icon>mdi-chevron-left</v-icon></v-col>
      <v-col sm="6" md="4" lg="3" xl="2" class="d-flex justify-center">
        <AlbumItem />
      </v-col>
      <v-col sm="6" md="4" lg="3" xl="2" class="d-flex justify-center">
        <AlbumItem />
      </v-col>
      <v-col sm="6" md="4" lg="3" xl="2" class="d-flex justify-center">
        <AlbumItem />
      </v-col>
      <v-col sm="6" md="4" lg="3" xl="2" class="d-flex justify-center">
        <AlbumItem />
      </v-col>
      <v-col sm="6" md="4" lg="3" xl="2" class="d-flex justify-center">
        <AlbumItem />
      </v-col>
      <v-col cols="1" class="d-flex justify-start align-center"><v-icon>mdi-chevron-right</v-icon></v-col>
    </v-row>
    <div class="mt-5 ml-6">
      Moje albumy
      <v-divider class="mb-5" width="120px" />
    </div>
    <v-row>
      <v-col class="d-flex justify-center" v-for="image in displayImages" :key="image.id" cols="12" sm="6" md="4" lg="3" xl="2">
        <img @click="showImg(image.file_name)" v-auth-image="`${link}${image.file_name}`" width="200" height="200" />
      </v-col>

      <v-col class="d-flex justify-center" cols="12" sm="6" md="4" lg="3" xl="2">
        <v-btn color="primary">Wszystkie zdjęcia </v-btn>
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-row>
        <v-col cols="10" class="d-flex justify-end">
          <v-icon active-class="activeIcon" @click="closeImg" style="margin-right: -22%; margin-top: -3%"> mdi-close</v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-icon x-large @click="prevImg">mdi-chevron-left</v-icon>

        <img v-auth-image="`${link}${currentImg}`" :height="overlayImageSize" />
        <v-icon x-large @click="nextImg">mdi-chevron-right</v-icon>
      </v-row>
    </v-overlay>
  </v-container>
</template>

<script>
import AlbumItem from '../components/Home/AlbumItem.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Home',

  components: { AlbumItem },
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
    this.displayImages = this.images.splice(0, 12);
  },
  computed: {
    ...mapGetters({
      images: 'getImages',
    }),
  },
  methods: {
    ...mapActions({
      fetchImages: 'fetchImages',
    }),
    showImg(id) {
      document.documentElement.style.overflow = 'hidden';
      console.log(this.windowWidth);
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
