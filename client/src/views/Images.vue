<template>
  <v-main>
    <v-overlay :value="overlay">
      <ImgUpload @clicked="changeOverlay" />
    </v-overlay>
    <ImgGrid v-bind:selectMode="this.selectMode" v-bind:images="this.images"></ImgGrid>
  </v-main>
</template>

<script>
import ImgUpload from '../components/Images/ImgUpload.vue';
import ImgGrid from '../components/Images/ImgGrid.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Images',
  components: { ImgGrid, ImgUpload },
  data() {
    return {
      overlay: false,
      selectMode: false,
    };
  },
  create() {
    this.fetchImages();
  },
  computed: {
    ...mapGetters({
      images: 'getImages',
      albums: 'getAlbums',
      selected: 'getSelected',
    }),
  },
  methods: {
    ...mapMutations({
      setSelected: 'setSelected',
    }),
    ...mapActions({
      fetchImages: 'fetchImages',
      addAlbumImages: 'addAlbumImages',
      createAlbum: 'createAlbum',
    }),
    changeSelectMode() {
      this.selectMode = !this.selectMode;
      if (this.selectMode) {
        this.setSelected([]);
      }
    },
    changeOverlay(value) {
      this.overlay = value;
    },
    addImages() {
      this.overlay = true;
    },
    addToAlbum(id) {
      this.addAlbumImages({ id: id, images: this.selected });
      this.selectMode = !this.selectMode;
    },
    addToNewAlbum() {
      this.createAlbum({ name: 'Wakacje 2020', images: this.selected });
      this.selectMode = !this.selectMode;
    },
  },
};
</script>

<style lang="scss" scoped></style>
