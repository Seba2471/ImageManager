<template>
  <v-container>
    <ImgTopBar @sortPick="getSortPick" :images="this.displayImages" />
    <ImgGrid imgHeight="250px" :images="this.displayImages" />
  </v-container>
</template>

<script>
import ImgTopBar from '../components/Images/ImgTopBar.vue';
import { mapMutations, mapGetters, mapActions } from 'vuex';

import ImgGrid from '../components/Images/ImgGrid.vue';
export default {
  name: 'Home',

  components: {
    ImgGrid,
    ImgTopBar,
  },
  data() {
    return {
      overlay: false,
      currentImg: '',
      overlayImageSize: '300px',
      displayImages: {},
      sortPick: 'Od najnowszych',
      sortItems: ['Od najnowszych', 'Od najstarszych', 'Data utworzenia(od najnowsze)', 'Data utworzenia(od najstarsze)'],
      currentPosition: 0,
    };
  },
  created() {
    this.fetchImages();
    this.fetchAlbums();
    this.displayImages = this.images;
    this.setSelected([]);
  },
  computed: {
    ...mapGetters({
      images: 'getImages',
      reverseImages: 'getReverseImage',
      sortByModifityDateDesc: 'getSortByModifityDateDesc',
      sortByModifityDateAsc: 'getSortByModifityDateAsc',
      selected: 'getSelected',
      albums: 'getAlbums',
    }),
  },
  watch: {
    images: function () {
      this.sortImages(this.sortPick);
    },
    sortPick: async function (val) {
      this.sortImages(val);
    },
  },
  methods: {
    ...mapMutations({
      setSelected: 'setSelected',
    }),
    ...mapActions({
      fetchImages: 'fetchImages',
      addAlbumImages: 'addAlbumImages',
      deleteImage: 'deleteImage',
      fetchAlbums: 'fetchAlbums',
      createAlbum: 'createAlbum',
      sortImages: 'sortImages',
    }),
    getSortPick(val) {
      this.sortPick = val;
    },
    sortImages(val) {
      if (val == this.sortItems[0]) {
        this.displayImages = this.images;
      } else if (val == this.sortItems[1]) {
        this.displayImages = this.reverseImages;
      } else if (val == this.sortItems[2]) {
        this.displayImages = this.sortByModifityDateDesc;
      } else if (val == this.sortItems[3]) {
        this.displayImages = this.sortByModifityDateAsc;
      }
    },
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
.sortButton {
  margin: 0 0;
  padding: 0 0;
}
</style>
