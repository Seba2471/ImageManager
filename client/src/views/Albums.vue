<template>
  <div class="mt-15 ma-8">
    <v-row>
      <v-col @click="showAlbum(album)" cols="4" v-for="album in this.albums" :key="album._id">
        <div class="d-flex justify-center align-center">
          <img class="albumImg" v-auth-image="`${link}${album.thumbnail}`" />
        </div>

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
  created() {
    this.fetchAlbums();
  },
  methods: {
    ...mapActions({
      fetchAlbums: 'fetchAlbums',
    }),
    showAlbum(album) {
      this.$router.push({ path: `/album/${album._id}` });
    },
  },
};
</script>

<style>
.albumImg {
  border-radius: 50px;
  height: 23vh;
  max-width: 30vh;
}
.albumTitle {
  font-size: 18px;
  font-weight: bold;
}
</style>
