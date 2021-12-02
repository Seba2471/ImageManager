<template>
  <div>
    <v-row class="wrapper">
      <v-col lg="1">
        <h1 class="d-flex align-center">PICTLIST</h1>
      </v-col>
      <v-col lg="4" offset="1">
        <v-text-field hide-details solo label="Wyszukaj" prepend-inner-icon="mdi-magnify"></v-text-field>
      </v-col>
      <v-col lg="1" offset="3" class="d-flex align-center">
        <v-row>
          <v-col @click="showImgUploader = true" class="d-flex align-center justify-center imagesButton">
            <v-icon> mdi-tray-arrow-up </v-icon>
            <div class="d-flex align-center ml-2">Prześlij</div>
          </v-col>
        </v-row>
        <v-overlay :value="showImgUploader">
          <ImgUpload @close="closeImagesUploader" />
        </v-overlay>
      </v-col>
      <v-col lg="2" class="d-flex justify-end">
        <v-menu left offset-y transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <div class="d-flex align-center">seba4@gmail.com</div>

            <v-icon x-large v-bind="attrs" v-on="on">mdi-chevron-down</v-icon>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title>Wyloguj</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ImgUpload from './Images/ImgUpload.vue';
export default {
  components: { ImgUpload },
  name: 'TopBar',
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      showImgUploader: false,
    };
  },
  methods: {
    closeImagesUploader(value) {
      this.showImgUploader = value;
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
