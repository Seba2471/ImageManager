<template>
  <div>
    <v-col cols="12" class="d-flex align-center justify-center mt-5">
      <h2>Kreator tworzenia nowego albumu</h2>
    </v-col>
    <v-row class="d-flex align-center justify-center mt-10">
      <v-col cols="2" xl="2" lg="3" md="4">
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

    <v-col cols="8" offset="4" xl="3" lg="3" sm="3" xs="2" md="1" offset-xl="9" offset-lg="9">
      <div @click="next" class="customButton pa-3 d-flex align-center justify-center">
        <span class="ml-3">Dalej</span>
        <v-icon> mdi-chevron-right </v-icon>
      </div>
    </v-col>
  </div>
</template>

<script>
import Step from '../components/NewAlbum/Step.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
// import ImgGrid from '../components/Images/ImgGrid.vue';
export default {
  components: {
    // ImgGrid,
    Step,
  },
  data() {
    return {
      showTitle: true,
      showThumbnail: false,
      showImages: false,
      albumTitle: '',
      images: [],
    };
  },
  created() {
    this.images = this.selected;
    this.showTitle = true;
  },
  computed: {
    ...mapGetters({
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
    addAlbum() {
      this.createAlbum({ name: this.albumTitle, images: this.selected });
      this.setSelected([]);
    },
  },
};
</script>

<style scoped>
.titlInput {
  font-size: 50px;
}
</style>
