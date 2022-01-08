<template>
  <div>
    {{ this.albumThumbnail }}
    <v-col cols="12" class="d-flex align-center justify-center mt-5">
      <h2>Kreator tworzenia nowego albumu</h2>
    </v-col>
    <StepList v-if="!mobile" :showTitle="showTitle" :showThumbnail="showThumbnail" :showImages="showImages" />
    <StepListMobile v-if="mobile" :showTitle="showTitle" :showThumbnail="showThumbnail" :showImages="showImages" />

    <v-col v-if="showTitle" cols="10" offset="1" xl="6" offset-xl="3" class="mt-16">
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
        <v-col cols="6" xl="4" lg="4" class="d-flex align-center justify-start mb-5">
          <div @click="back" class="customButton pa-3 d-flex align-center justify-center">
            <v-icon> mdi-chevron-left </v-icon>
            <span class="ml-3">Podaj tytuł</span>
          </div>
        </v-col>
        <v-col xl="4" offset-xl="4" class="d-flex align-center justify-end mb-5">
          <div @click="next" class="customButton pa-3 d-flex align-center justify-end">
            <span class="ml-3">Wybierz zdjęcia</span>
            <v-icon> mdi-chevron-right </v-icon>
          </div>
        </v-col>
      </v-row>
      <ImgGrid :images="this.images" imgHeight="150px" mobileCols="6" selectOne="true" />
    </v-col>
    <v-col v-if="showImages" cols="8" offset="1" class="mt-16">
      <v-row>
        <v-col xl="4" lg="4" class="d-flex align-center justify-start mb-5">
          <div @click="back" class="customButton pa-3 d-flex align-center justify-center">
            <v-icon> mdi-chevron-left </v-icon>
            <span class="ml-3">Wybierz miniaturkę</span>
          </div>
        </v-col>
        <v-col xl="4" offset-xl="4" class="d-flex align-center justify-end mb-5">
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
import StepListMobile from '../components/Album/StepListMobile.vue';
import StepList from '../components/Album/StepList.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ImgGrid from '../components/Images/ImgGrid.vue';
export default {
  components: {
    ImgGrid,
    StepList,
    StepListMobile,
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
      mobile: false,
    };
  },
  async created() {
    this.savedImages = this.selected;
    this.setSelected([]);
    this.showTitle = true;
    this.mobile = await this.isMobile(1200);
  },
  watch: {
    windowWidth: async function () {
      this.mobile = await this.isMobile(1200);
    },
  },
  computed: {
    ...mapGetters({
      images: 'getImages',
      selected: 'getSelected',
      windowWidth: 'getWidth',
    }),
  },
  methods: {
    ...mapMutations({
      setSelected: 'setSelected',
    }),
    ...mapActions({
      createAlbum: 'createAlbum',
      isMobile: 'isMobile',
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
      this.createAlbum({
        name: this.albumTitle,
        thumbnail: albumThumbnail,
        images: this.selected,
      });
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
