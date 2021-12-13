<template>
  <v-container>
    <v-row justify-center>
      <v-col xl="4" lg="6" xs="12" offset-xl="8" offset-lg="6" class="d-flex align-center justify-end">
        <v-col cols="5" v-if="isSelected">
          <v-row>
            <v-menu bottom close-on-click>
              <template v-slot:activator="{ on, attrs }">
                <v-col class="customButton pa-3 d-flex align-center justify-center" v-bind="attrs" v-on="on" @click="sort">
                  <v-icon> mdi-plus-box-outline </v-icon>
                  <span class="ml-3">Dodaj do albumu</span>
                </v-col>
              </template>

              <v-list class="pa-5">
                <v-list-item @click="createNewAlbum" class="customButton pl-4 pr-4">
                  <v-list-item-title> <v-icon> mdi-plus-box-outline </v-icon> <span class="ml-2">Nowy album </span> </v-list-item-title>
                </v-list-item>
                <v-list-item
                  @click="addImagesToExistAlbum(album._id)"
                  class="customButton pl-4 pr-4 d-flex align-center justify-center"
                  v-for="album in this.albums"
                  :key="album._id"
                >
                  <v-list-item-title>
                    <v-icon> mdi-panorama-variant </v-icon> <span class="ml-2"> {{ album.name }} </span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
        </v-col>
        <v-col cols="3" v-if="isSelected">
          <v-row>
            <v-col class="customButton pa-3 d-flex align-center justify-center" @click="deleteSelectedImages">
              <v-icon> mdi-trash-can-outline </v-icon>
              <span class="ml-3">Usuń</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="5">
          <v-row>
            <v-col class="customButton pa-3 d-flex align-center justify-center" @click="sort">
              <v-icon> mdi-sort</v-icon>
              <span class="ml-3">Od najnowszych </span>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
    <ImgGrid class="mr-5" imgHeight="250px" :images="this.images" />
  </v-container>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';

import ImgGrid from '../components/Images/ImgGrid.vue';
export default {
  name: 'Home',

  components: {
    ImgGrid,
  },
  data() {
    return {
      link: `${process.env.VUE_APP_BASE_URL}/image/`,
      overlay: false,
      currentImg: '',
      windowWidth: window.innerWidth,
      overlayImageSize: '300px',
      displayImages: {},
      currentPosition: 0,
      isSelected: false,
    };
  },
  created() {
    this.fetchImages();
    this.fetchAlbums();
  },
  computed: {
    ...mapGetters({
      images: 'getImages',
      selected: 'getSelected',
      albums: 'getAlbums',
    }),
  },
  watch: {
    selected: function (val) {
      if (val.length == 0) {
        this.isSelected = false;
      } else {
        this.isSelected = true;
      }
    },
  },
  methods: {
    ...mapMutations({
      setSelected: 'setSelected',
    }),
    ...mapActions({
      fetchImages: 'fetchImages',
      addAlbumImages: 'addAlbumImages',
      deleteImage: 'deleteImage',
      fetchAlbums: 'fetchAlbums',
      createAlbum: 'createAlbum',
    }),
    sort() {},
    addImagesToExistAlbum(id) {
      this.addAlbumImages({ id, images: this.selected });
      this.setSelected([]);
    },
    createNewAlbum() {
      this.$router.push('/album/new');
    },
    deleteSelectedImages() {
      this.deleteImage();
    },
    showImg(id) {
      document.documentElement.style.overflow = 'hidden';
      if (this.windowWidth > 1904) {
        this.overlayImageSize = '900px';
      } else if (this.windowWidth < 1904 && this.windowWidth > 1264) {
        this.overlayImageSize = '700px';
      }
      this.overlay = true;
      this.currentImg = id;
    },
    closeImg() {
      this.currentPosition = 0;
      this.overlay = false;
      document.documentElement.style.overflow = 'auto';
    },
    prevImg() {
      try {
        const currentPosition = this.images
          .map(function (e) {
            return e.file_name;
          })
          .indexOf(this.currentImg);
        this.currentImg = this.images[currentPosition - 1].file_name;
      } catch (e) {
        this.currentImg = this.images[this.currentPosition].file_name;
      }
    },
    nextImg() {
      try {
        this.currentPosition = this.images
          .map(function (e) {
            return e.file_name;
          })
          .indexOf(this.currentImg);
        this.currentImg = this.images[this.currentPosition + 1].file_name;
      } catch (e) {
        this.currentImg = this.images[this.currentPosition].file_name;
      }
    },
  },
};
</script>
