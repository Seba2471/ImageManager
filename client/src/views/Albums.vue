<template>
  <div class="mt-15 ma-8">
    <v-row>
      <v-col cols="3" v-for="album in this.albums" :key="album._id">
        <img class="albumImg d-flex justify-center align-center" v-auth-image="`${link}1638435250273.jpg`" />
        <span class="albumTitle mt-3 d-flex justify-center align-center"> {{ album.name }} </span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Albums',
  data() {
    return {
      link: `${process.env.VUE_APP_BASE_URL}/image/`,
    };
  },
  computed: {
    ...mapGetters({
      albums: 'getAlbums',
    }),
  },
  create() {
    this.fetchAlbums();
  },
  methods: {
    ...mapActions({
      fetchAlbums: 'fetchAlbums',
    }),
  },
};
</script>

<style scoped>
.albumImg {
  border-radius: 50px;
  height: 250px;
}
.albumTitle {
  font-size: 18px;
  font-weight: bold;
}
</style>
