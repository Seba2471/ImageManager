<template>
  <div>
    <v-col @click="addAlbum" cols="8" offset="4" xl="3" lg="3" sm="3" xs="2" md="1" offset-xl="9" offset-lg="9">
      <div class="customButton pa-3 d-flex align-center justify-center">
        <v-icon> mdi-plus-box-outline </v-icon>
        <span class="ml-3">Stwórz nowy album</span>
      </div>
    </v-col>
    <v-row class="d-flex justify-center">
      <v-col xl="8" lg="8">
        <v-row>
          <v-row>
            <v-col cols="12" class="d-flex align-center justify-center mt-5">
              <h2>Kreator tworzenia nowego albumu</h2>
            </v-col>
          </v-row>
          <v-col cols="10" offset="1" xl="6" offset-xl="3" class="mt-16 ma-xs-5">
            <v-text-field v-model="albumTitle" outlined label="Tytuł albumu" />
          </v-col>
          <v-col v-if="!showImages" @click="showImages = true" cols="6" offset="3" class="d-flex align-center justify-center customButton mt-16">
            <v-icon> mdi-plus</v-icon>
            <div class="d-flex align-center ml-2">Dodaj zdjęcia</div>
          </v-col>
          <v-col cols="12">
            <ImgGrid cols="6" v-if="showImages" imgHeight="150px" mobileCols="6" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import ImgGrid from '../components/Images/ImgGrid.vue';
export default {
  components: {
    ImgGrid,
  },
  data() {
    return {
      showImages: false,
      albumTitle: '',
    };
  },
  created() {
    console.log('RUN');
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
