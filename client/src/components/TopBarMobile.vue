<template>
  <div>
    <v-row v-if="!showSearch" class="wrapper">
      <v-col lg="1">
        <router-link class="text-decoration-none" to="/">
          <h2 class="d-flex align-center">PICTLIST</h2>
        </router-link>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="1" class="d-flex justify-end align-center">
        <v-row>
          <v-col @click="showSearch = true" class="d-flex align-center justify-end customButton">
            <v-icon> mdi-magnify </v-icon>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" class="d-flex align-center">
        <v-row>
          <v-col @click="showImgUploader = true" class="d-flex align-center justify-center customButton">
            <v-icon> mdi-tray-arrow-up </v-icon>
          </v-col>
        </v-row>
        <v-overlay :value="showImgUploader">
          <ImgUpload @close="closeImagesUploader" />
        </v-overlay>
      </v-col>
      <v-col cols="2" class="d-flex align-center">
        <v-menu min-width="200px" left offset-y transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-menu</v-icon>
          </template>

          <v-list color="background">
            <v-list-item :to="{ path: '/' }">
              <v-list-item-title class="text-center">Zdjęcia</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: 'Albums' }">
              <v-list-item-title class="text-center">Albumy</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: 'ChangePassword' }">
              <v-list-item-title class="text-center">Zmień hasło</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: 'Login' }" @click="this.logout">
              <v-list-item-title class="text-center">Wyloguj</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row v-if="showSearch">
      <v-col class="ma-5">
        <v-text-field
          v-model="search"
          @keyup="searchTimeOut()"
          hide-details
          solo
          label="Wyszukaj"
          prepend-inner-icon="mdi-arrow-left"
          @click:prepend-inner="showSearch = false"
        ></v-text-field>
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
    searchTimeOut() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.getSearch();
      }, 800);
    },
    getSearch() {
      this.$router.push(`/search/${this.search}`);
      this.search = '';
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
