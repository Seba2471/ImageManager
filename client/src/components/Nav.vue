<template>
  <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" floating permanent color="background" elevation="10">
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>Imager</v-list-item-title>

      <v-btn icon @click="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-list nav dense>
      <v-list-item active-class="menuActive" :to="{ path: '/' }" link>
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Strona główna</v-list-item-title>
      </v-list-item>
      <v-list-item active-class="" :to="{ name: 'Images' }" link>
        <v-list-item-icon>
          <v-icon>mdi-image</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Zdjęcia</v-list-item-title>
      </v-list-item>
      <v-list-group v-for="item in items" :key="item.title" v-model="item.active" :prepend-icon="item.action" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item :to="{ path: `/albums/${album._id}` }" v-for="album in albums" :key="album._id">
          <v-list-item-icon><v-icon> mdi-panorama-variant</v-icon> </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="album.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
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
      items: [
        {
          action: 'mdi-image-multiple',
          title: 'Albums',
        },
      ],
    };
  },
  watch: {
    mini: function (val) {
      this.$emit('clicked', val);
    },
  },
  computed: {
    ...mapGetters({
      albums: 'getAlbums',
    }),
  },
};
</script>

<style scoped>
.menuActive {
  color: inherit;
}
</style>
>
