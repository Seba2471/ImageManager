<template>
  <div>Tutaj albumy</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
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
