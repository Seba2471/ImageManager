<template>
  <div>
    {{ this.albumThumbnail }}
    <v-col cols="12" class="d-flex align-center justify-center mt-5">
      <h2>Kreator tworzenia nowego albumu</h2>
    </v-col>
    <v-row class="d-flex align-center justify-center mt-10">
      <v-col cols="2" xl="2" lg="3" md="4" xs="12">
        <Step number="1" title="Podaj tytuł" :disable="!showTitle" />
      </v-col>
      <v-col cols="2" xl="2" lg="3" md="4" class="ml-7">
        <Step number="2" title="Wybierz miniaturkę" :disable="!showThumbnail" />
      </v-col>
      <v-col cols="2" xl="2" lg="3" md="4" class="ml-7">
        <Step number="3" title="Wybierz zdjęcia" :disable="!showImages" />
      </v-col>
      GOTOWE
    </v-row>
    <v-col v-if="showTitle" xl="6" offset-xl="3" xs="12" class="mt-16">
      <v-row>
        <v-col xl="4" offset-xl="8" xs="6" class="d-flex align-center justify-end mb-5">
          <div @click="next" class="customButton pa-3 d-flex align-center justify-end">
            <span class="ml-3">Wybierz miniaturkę</span>
            <v-icon> mdi-chevron-right </v-icon>
          </div>
        </v-col>
      </v-row>
      <v-text-field v-model="albumTitle" outlined label="Tytuł albumu" />
    </v-col>
    <v-col v-if="showThumbnail" cols="10" offset="1" class="mt-16">
      <v-row>
        <v-col xl="4" lg="4" xs="6" class="d-flex align-center justify-start mb-5">
          <div @click="back" class="customButton pa-3 d-flex align-center justify-center">
            <v-icon> mdi-chevron-left </v-icon>
            <span class="ml-3">Podaj tytuł</span>
          </div>
        </v-col>
        <v-col xl="4" offset-xl="4" xs="6" class="d-flex align-center justify-end mb-5">
          <div @click="next" class="customButton pa-3 d-flex align-center justify-end">
            <span class="ml-3">Wybierz zdjęcia</span>
            <v-icon> mdi-chevron-right </v-icon>
          </div>
        </v-col>
      </v-row>
      <ImgGrid :images="this.images" imgHeight="150px" mobileCols="6" selectOne="true" />
    </v-col>
    <v-col v-if="showImages" cols="10" offset="1" class="mt-16">
      <v-row>
        <v-col xl="4" lg="4" xs="6" class="d-flex align-center justify-start mb-5">
          <div @click="back" class="customButton pa-3 d-flex align-center justify-center">
            <v-icon> mdi-chevron-left </v-icon>
            <span class="ml-3">Wybierz miniaturkę</span>
          </div>
        </v-col>
        <v-col xl="4" offset-xl="4" xs="6" class="d-flex align-center justify-end mb-5">
          <div @click="addAlbum" class="customButton pa-3 d-flex align-center justify-end">
            <span class="ml-3">Stwórz album</span>
            <v-icon> mdi-chevron-right </v-icon>
          </div>
        </v-col>
      </v-row>
      <ImgGrid :images="this.images" imgHeight="150px" mobileCols="6" />
    </v-col>
  </div>
</template>

<script>
import Step from '../components/Album/Step.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ImgGrid from '../components/Images/ImgGrid.vue';
export default {
  components: {
    ImgGrid,
    Step,
  },
  data() {
    return {
      showTitle: true,
      showThumbnail: false,
      showImages: false,
      savedImages: [],
      albumTitle: '',
      albumThumbnail: '',
      albumImages: [],
    };
  },
  created() {
    this.savedImages = this.selected;
    this.setSelected([]);
    this.showTitle = true;
  },
  computed: {
    ...mapGetters({
      images: 'getImages',
      selected: 'getSelected',
    }),
  },
  methods: {
    ...mapMutations({
      setSelected: 'setSelected',
    }),
    ...mapActions({
      createAlbum: 'createAlbum',
    }),
    next() {
      if (this.showTitle) {
        this.showThumbnail = true;
        this.showTitle = false;
      } else if (this.showThumbnail) {
        this.showImages = true;
        this.showThumbnail = false;
        this.albumThumbnail = this.selected;
        this.setSelected(this.savedImages);
      }
    },
    back() {
      if (this.showImages) {
        this.showThumbnail = true;
        this.showImages = false;
      } else if (this.showThumbnail) {
        this.showTitle = true;
        this.showThumbnail = false;
      }
    },
    addAlbum() {
      if (this.albumTitle === '') {
        this.albumTitle = 'Nowy album';
      }
      let albumThumbnail = null;
      this.images.map((image) => {
        if (image._id == this.albumThumbnail[0]) {
          albumThumbnail = image.file_name;
        }
      });
      this.createAlbum({ name: this.albumTitle, thumbnail: albumThumbnail, images: this.selected });
      this.$router.push('/albums');
    },
  },
};
</script>

<style scoped>
.titlInput {
  font-size: 50px;
}
</style>
