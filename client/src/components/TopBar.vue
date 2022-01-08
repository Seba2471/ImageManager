<template>
  <div>
    <v-row class="wrapper">
      <v-col lg="1">
        <router-link class="text-decoration-none" to="/">
          <h1 class="d-flex align-center">PICTLIST</h1>
        </router-link>
      </v-col>
      <v-col lg="4" xl="4" sm="4" offset-lg="1">
        <v-text-field hide-details solo @keyup="searchTimeOut()" v-model="search" label="Wyszukaj" prepend-inner-icon="mdi-magnify"></v-text-field>
      </v-col>
      <v-col cols="1" offset="2" offset-xl="3" offset-md="1" class="d-flex align-center">
        <v-row>
          <v-col @click="showImgUploader = true" class="d-flex align-center justify-center customButton">
            <v-icon> mdi-tray-arrow-up </v-icon>
            <div class="d-flex align-center ml-2">Prześlij</div>
          </v-col>
        </v-row>
        <v-overlay :value="showImgUploader">
          <ImgUpload @close="closeImagesUploader" />
        </v-overlay>
      </v-col>
      <v-col cols="2" offset="1" offset-xl="0" offset-md="2" class="d-flex justify-end">
        <v-menu min-width="250px" left offset-y transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <div class="d-flex align-center">{{ userEmail }}</div>

            <v-icon x-large v-bind="attrs" v-on="on">mdi-chevron-down</v-icon>
          </template>

          <v-list color="background">
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ImgUpload from './Images/ImgUpload.vue';
export default {
  components: { ImgUpload },
  name: 'TopBar',
  data() {
    return {
      loading: false,
      items: [],
      search: '',
      awaitingSearch: false,
      select: null,
      showImgUploader: false,
    };
  },
  computed: {
    ...mapGetters({
      userEmail: 'getUserEmail',
    }),
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
