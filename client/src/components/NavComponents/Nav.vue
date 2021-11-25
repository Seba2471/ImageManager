<template>
  <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" floating permanent color="background" elevation="10">
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>Imager</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-list dense>
      <HomeItem />
      <ImageItem />
      <AlbumItem />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import HomeItem from './HomeItem.vue';
import AlbumItem from './AlbumItem.vue';
import ImageItem from './ImageItem.vue';
export default {
  components: { ImageItem, AlbumItem, HomeItem },
  name: 'NavComponent',

  data() {
    return {
      drawer: true,
      items: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
        },
        {
          title: 'Photos',
          icon: 'mdi-image',
        },
        {
          title: 'About',
          icon: 'mdi-help-box',
        },
      ],
      hover: true,
      mini: false,
    };
  },
};
</script>

<style></style>
