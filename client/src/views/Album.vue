<template>
  <div>
    <v-row class="d-flex align-center justify-start mt-2">
      <v-col v-if="!isEdit" @click="edit" cols="1" class="customButton d-flex align-center justify-center">
        <v-icon> mdi-sort</v-icon>
        <span class="ml-3">Edytuj </span>
      </v-col>
      <v-col cols="12" xl="10" offset-xl="1">
        <EditTopBar v-if="isEdit" :images="this.album.images" @disableEdit="disableEdit" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center">
        <h1>{{ album.name }}</h1>
      </v-col>
    </v-row>
    <ImgGrid class="d-flex align-center justify-start" :images="this.album.images" imgHeight="250px" />
  </div>
</template>

<script>
import EditTopBar from '../components/Album/EditTopBar.vue';
import ImgGrid from '../components/Images/ImgGrid.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  components: { ImgGrid, EditTopBar },
  name: 'Album',
  props: ['id'],
  data() {
    return {
      album: {},
      selectMode: false,
      isEdit: false,
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
    disableEdit(val) {
      this.isEdit = val;
    },
    edit() {
      this.isEdit = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
