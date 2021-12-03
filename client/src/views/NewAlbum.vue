<template>
  <div>
    <v-row>
      <v-col cols="10" xl="10" lg="12" offset-xl="1" class="mt-2">
        <v-row>
          <v-col cols="3" offset="9" class="mt-5">
            <v-col @click="addAlbum" class="customButton pa-3 d-flex align-center justify-center">
              <v-icon> mdi-plus-box-outline </v-icon>
              <span class="ml-3">Stwórz nowy album</span>
            </v-col>
          </v-col>
          <v-row>
            <v-col cols="12" class="d-flex align-center justify-center">
              <h2>Kreator tworzenia nowego albumu</h2>
            </v-col>
          </v-row>
          <v-col cols="6" offset="3" class="mt-16">
            <v-text-field v-model="albumTitle" outlined label="Tytuł albumu" />
          </v-col>
          <v-col v-if="!showImages" @click="showImages = true" cols="6" offset="3" class="d-flex align-center justify-center customButton mt-16">
            <v-icon> mdi-plus</v-icon>
            <div class="d-flex align-center ml-2">Dodaj zdjęcia</div>
          </v-col>
          <v-col cols="12">
            <ImgGrid v-if="showImages" imgHeight="150px" />
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
