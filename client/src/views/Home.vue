<template>
  <v-container>
    <ImgTopBar @sortPick="getSortPick" :images="this.displayImages" />
    <ImgGrid class="mr-5" imgHeight="250px" :images="this.displayImages" />
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
      link: `${process.env.VUE_APP_BASE_URL}/image/`,
      overlay: false,
      currentImg: '',
      windowWidth: window.innerWidth,
      overlayImageSize: '300px',
      displayImages: {},
      sortPick: 'Od najnowszy',
      sortItems: ['Od najnowszy', 'Od najstarszych', 'Data utworzenia(od najnowsze)', 'Data utworzenia(od najstarsze)'],
      currentPosition: 0,
      isSelected: false,
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
    selected: function (val) {
      if (val.length == 0) {
        this.isSelected = false;
      } else {
        this.isSelected = true;
      }
    },
    sortPick: async function (val) {
      this.sortImages(val);
    },
    windowWidth: function (val) {
      console.log(val);
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
      this.sortImages(val);
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
    checkAllImages() {
      const result = this.images.map((a) => a._id);
      this.setSelected(result);
    },
    uncheckAllImages() {
      this.setSelected([]);
    },
    addImagesToExistAlbum(id) {
      this.addAlbumImages({ id, images: this.selected });
      this.setSelected([]);
    },
    createNewAlbum() {
      this.$router.push('/album/new');
    },
    deleteSelectedImages() {
      this.$confirm('Czy na pewno chcesz usunąć?').then(() => {
        this.deleteImage();
      });
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
