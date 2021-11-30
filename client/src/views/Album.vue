<template>
  <div>
    <div class="mt-5 ml-6">
      {{ album.name }}
      <v-divider class="mb-5" width="120px" />
      <v-btn v-if="!selectMode" @click="changeSelectMode" small color="primary"> Zazanacz </v-btn>
      <v-btn v-if="!selectMode" @click="changeSelectMode" class="ml-2" small color="success"> Dodaj zdjęcia </v-btn>
      <v-btn v-if="selectMode" @click="changeSelectMode" class="ml-2" small color="error"> Anuluj </v-btn>
    </div>
    <ImgGrid v-bind:selectMode="this.selectMode" v-bind:images="this.album.images" />
  </div>
</template>

<script>
import ImgGrid from '../components/Images/ImgGrid.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  components: { ImgGrid },
  name: 'Album',
  props: ['id'],
  data() {
    return {
      album: {},
      selectMode: false,
    };
  },
  watch: {
    id: function (val) {
      this.album = this.albums.filter((item) => {
        return item._id == val;
      })[0];
    },
  },
  mounted() {
    this.album = this.albums.filter((item) => {
      return item._id == this.id;
    })[0];
  },
  created() {
    this.fetchAlbums();
  },
  computed: {
    ...mapGetters({
      albums: 'getAlbums',
    }),
  },
  methods: {
    ...mapMutations({
      setSelected: 'setSelected',
      addAlbumImage: 'addAlbumImage',
    }),
    ...mapActions({
      fetchAlbums: 'fetchAlbums',
    }),
    changeSelectMode() {
      this.selectMode = !this.selectMode;
      if (this.selectMode) {
        this.setSelected([]);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
