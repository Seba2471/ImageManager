<template>
  <div>
    <v-col cols="12" class="d-flex align-center justify-center mt-5">
      <h2>Kreator tworzenia nowego albumu</h2>
    </v-col>
    <StepList v-if="!mobile" :showTitle="showTitle" :showThumbnail="showThumbnail" :showImages="showImages" />
    <StepListMobile v-if="mobile" :showTitle="showTitle" :showThumbnail="showThumbnail" :showImages="showImages" />
    <ErrorAlert :responseStatus="status" />
    <v-col v-if="showTitle" cols="10" offset="1" xl="6" offset-xl="3" :class="status ? 'mt-16' : 'mt-5'">
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
    <v-col v-if="showThumbnail" cols="10" offset="1" :class="status ? 'mt-16' : 'mt-5'">
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
      <ImgGrid v-if="imageStatus" :images="this.images" imgHeight="150px" mobileCols="6" selectOne="true" />
      <ErrorAlert :responseStatus="imageStatus" />
    </v-col>
    <v-col v-if="showImages" cols="10" offset="1" :class="status ? 'mt-16' : 'mt-5'">
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
      <ImgGrid v-if="imageStatus" :images="this.images" imgHeight="150px" mobileCols="6" />
      <ErrorAlert :responseStatus="imageStatus" />
    </v-col>
  </div>
</template>

<script>
import StepListMobile from '../components/Album/StepListMobile.vue';
import StepList from '../components/Album/StepList.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ImgGrid from '../components/Images/ImgGrid.vue';
import ErrorAlert from '../components/ErrorAlert.vue';
export default {
  components: {
    ImgGrid,
    StepList,
    StepListMobile,
    ErrorAlert,
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
      status: true,
      imageStatus: true,
    };
  },
  async created() {
    this.imageStatus = await this.fetchImages();
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
      selected: 'getSelectedImages',
      windowWidth: 'getWidth',
    }),
  },
  methods: {
    ...mapMutations({
      setSelected: 'setSelectedImages',
    }),
    ...mapActions({
      fetchImages: 'fetchImages',
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
    async addAlbum() {
      if (this.albumTitle === '') {
        this.albumTitle = 'Nowy album';
      }
      let albumThumbnail = null;
      this.images.map((image) => {
        if (image._id == this.albumThumbnail[0]) {
          albumThumbnail = image.file_name;
        }
      });
      this.status = await this.createAlbum({
        name: this.albumTitle,
        thumbnail: albumThumbnail,
        images: this.selected,
      });
      if (!this.status) {
        this.showTitle = true;
        this.showThumbnail = false;
        this.showImages = false;
      } else {
        this.setSelected([]);
        this.$router.push('/albums');
      }
    },
  },
};
</script>

<style scoped>
.titlInput {
  font-size: 50px;
}
</style>
