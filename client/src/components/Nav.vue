<template>
  <v-navigation-drawer v-model="drawer" floating permanent color="background" elevation="10">
    <v-list nav dense>
      <v-list-item active-class="active" :to="{ path: '/' }" link>
        <v-list-item-icon>
          <v-icon>mdi-image</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Zdjęcia</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="active" :to="{ name: 'Albums' }" link>
        <v-list-item-icon>
          <v-icon>mdi-image</v-icon>
        </v-list-item-icon>
        <v-list-item-title
          >Albumy <v-icon class="ml-16" @click="showAlbums"> {{ icon }}</v-icon></v-list-item-title
        >
      </v-list-item>
      <v-list-item-group class="ml-10" :hidden="hideAlbums">
        <v-list-item active-class="active" :to="{ path: `/album/${album._id}` }" v-for="album in albums" :key="album._id">
          <v-list-item-icon><v-icon> mdi-panorama-variant</v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="album.name"> </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
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
      icon: 'mdi-chevron-down',
    };
  },
  watch: {
    hideAlbums: function (val) {
      this.getIcon(val);
    },
  },
  computed: {
    ...mapGetters({
      albums: 'getAlbums',
    }),
  },
  methods: {
    showAlbums() {
      this.hideAlbums = !this.hideAlbums;
      console.log('test');
    },
    getIcon(val) {
      if (val) {
        this.icon = 'mdi-chevron-down';
      } else {
        this.icon = 'mdi-chevron-up';
      }
    },
  },
};
</script>

<style scoped>
.active {
  background-color: #dddddd !important;
  color: var(--v-text-base);
}
</style>
