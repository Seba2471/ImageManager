<template>
  <v-navigation-drawer v-model="drawer" floating permanent color="background" elevation="10">
    <v-list dense>
      <v-list-item active-class="active" :to="{ path: '/' }" link>
        <v-list-item-icon>
          <v-icon>mdi-image</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Zdjęcia</v-list-item-title>
      </v-list-item>
      <v-list-item :class="albumsClass" @click="routerAction" shaped active-class="active">
        <v-list-item-icon>
          <v-icon>mdi-image</v-icon>
        </v-list-item-icon>
        <v-list-item-title
          >Albumy <v-icon class="ml-16" @click="showAlbums"> {{ icon }}</v-icon>
        </v-list-item-title>
      </v-list-item>
      <v-list-item-group class="ml-10" :hidden="hideAlbums">
        <v-list-item class="mt-1" active-class="active" :to="{ path: '/album/new' }">
          <v-list-item-icon>
            <v-icon> mdi-plus-box-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dodaj album </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="mt-1" active-class="active" :to="{ path: `/album/${album._id}` }" v-for="album in albums" :key="album._id">
          <v-list-item-icon>
            <v-icon> mdi-panorama-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="album.name"> </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-progress-linear :value="uploadPercentage"></v-progress-linear>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'NavComponent',

  data() {
    return {
      drawer: true,
      mini: false,
      testowy: false,
      hideAlbums: true,
      iconClick: false,
      albumsClass: '',
      icon: 'mdi-chevron-down',
    };
  },
  watch: {
    hideAlbums: function (val) {
      this.albumsClass = 'active v-list-item--active';
      this.getIcon(val);
    },
    $route(to) {
      if (to.name == 'Albums') {
        this.albumsClass = 'active v-list-item--active';
      } else {
        this.albumsClass = '';
      }
    },
  },
  computed: {
    ...mapGetters({
      albums: 'getAlbums',
      uploadPercentage: 'getUploadPercentage',
    }),
  },
  methods: {
    routerAction() {
      if (!this.iconClick) {
        this.$router.push('/albums');
        this.iconClick = false;
      } else {
        this.iconClick = false;
      }
    },
    showAlbums() {
      this.hideAlbums = !this.hideAlbums;
      this.albumsClass = 'active v-list-item--active';
      this.iconClick = true;
    },
    getIcon(val) {
      if (val) {
        this.icon = 'mdi-chevron-down';
        this.albumsClass = 'active v-list-item--active';
      } else {
        this.icon = 'mdi-chevron-up';
        this.albumsClass = 'active v-list-item--active';
      }
    },
    checkPath(path) {
      if (window.location.pathname == path) {
        return true;
      } else {
        return false;
      }
    },
    changeToNewAlbum() {
      this.$router.push('/album/new');
      this.albumsClass = '';
    },
    changeAlbum(id) {
      this.$router.push(`/album/${id}`);
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #dddddd !important;
  color: var(--v-text-base) !important;
}
</style>
