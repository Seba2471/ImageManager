<template>
  <div>
    <v-row class="d-flex align-center justify-end mr-10 mt-2">
      <v-col class="ml-5">
        <h1>{{ album.name }}</h1>
      </v-col>
      <v-col cols="1" class="customButton d-flex align-center justify-center">
        <v-icon> mdi-sort</v-icon>
        <span class="ml-3">Edytuj </span>
      </v-col>
    </v-row>
    <ImgGrid :images="this.album.images" imgHeight="250px" />
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
  created() {
    this.fetchAlbums();
    this.setSelected([]);
  },
  mounted() {
    this.album = this.albums.filter((item) => {
      return item._id == this.id;
    })[0];
  },
  watch: {
    id: function (val) {
      this.album = this.albums.filter((item) => {
        return item._id == val;
      })[0];
    },
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
  },
};
</script>

<style lang="scss" scoped></style>
