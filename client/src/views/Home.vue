<template>
  <div>
    Moje zdjęcia
    <v-divider class="mb-5" width="10%" />
    <v-row>
      <v-col v-for="image in images" :key="image.id" cols="12" sm="4" md="3">
        <img @click="showImg(image.file_name)" v-auth-image="`${link}${image.file_name}`" width="200" height="200" />
        {{ image.file_name }}
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <img v-auth-image="`${link}${currentImg}`" height="300px" />
    </v-overlay>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Home',

  components: {},
  data() {
    return {
      link: `${process.env.VUE_APP_BASE_URL}/image/`,
      overlay: false,
      currentImg: '',
    };
  },
  created() {
    this.fetchImages();
  },
  computed: {
    ...mapGetters({
      images: 'getImages',
    }),
  },
  methods: {
    ...mapActions({
      fetchImages: 'fetchImages',
    }),
    showImg(id) {
      this.overlay = true;
      this.currentImg = id;
    },
  },
};
</script>
