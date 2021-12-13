<template>
  <div>
    <v-row>
      <v-col class="d-flex justify-center">
        <h1>{{ album.name }}</h1>
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
  },
  mounted() {
    this.album = this.albums.filter((item) => {
      return item._id == this.id;
    })[0];
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
