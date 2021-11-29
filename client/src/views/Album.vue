<template>
  <div>
    {{ album.name }}
    {{ album.images }}
    <ImgGrid v-bind:selectMode="this.selectMode" v-bind:images="this.album.images" />
  </div>
</template>

<script>
import ImgGrid from '../components/Images/ImgGrid.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: { ImgGrid },
  name: 'Album',
  props: ['id'],
  data() {
    return {
      album: null,
    };
  },
  watch: {
    id: function (val) {
      this.album = this.albums.filter((item) => {
        return item._id == val;
      })[0];
    },
  },
  create() {
    console.log(this.albums);
  },
  computed: {
    ...mapGetters({
      albums: 'getAlbums',
    }),
  },
  methods: {
    ...mapActions({}),
  },
};
</script>

<style lang="scss" scoped></style>
