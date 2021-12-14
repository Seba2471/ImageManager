<template>
  <div>
    <v-row v-if="!showSearch" class="wrapper">
      <v-col lg="1">
        <h1 class="d-flex align-center">PICTLIST</h1>
      </v-col>
      <v-spacer></v-spacer>
      <v-col lg="1" class="d-flex justify-end align-center">
        <v-row>
          <v-col @click="showSearch = true" class="d-flex align-center justify-end customButton">
            <v-icon> mdi-magnify </v-icon>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1" class="d-flex align-center">
        <v-row>
          <v-col @click="showImgUploader = true" class="d-flex align-center justify-center customButton">
            <v-icon> mdi-tray-arrow-up </v-icon>
          </v-col>
        </v-row>
        <v-overlay :value="showImgUploader">
          <ImgUpload @close="closeImagesUploader" />
        </v-overlay>
      </v-col>
      <v-col cols="1" class="d-flex align-center">
        <v-menu left offset-y transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-menu</v-icon>
          </template>

          <v-list>
            <v-list-item :to="{ name: 'Login' }" @click="this.logout">
              <v-list-item-title>Wyloguj</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row v-if="showSearch">
      <v-col class="ma-5">
        <v-text-field hide-details solo label="Wyszukaj" prepend-inner-icon="mdi-arrow-left" @click:prepend-inner="showSearch = false"></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ImgUpload from './Images/ImgUpload.vue';
export default {
  props: ['mobile'],
  components: { ImgUpload },
  name: 'TopBar',
  data() {
    return {
      showSearch: false,
      loading: false,
      items: [],
      search: null,
      select: null,
      showImgUploader: false,
    };
  },
  methods: {
    ...mapActions({
      logout: 'logout',
    }),
    closeImagesUploader(value) {
      this.showImgUploader = value;
    },
    hideSearch() {
      console.log('click');
    },
  },
};
</script>

<style>
.wrapper {
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 1%;
  padding-bottom: 1%;
  margin: 0 0;
}
</style>
