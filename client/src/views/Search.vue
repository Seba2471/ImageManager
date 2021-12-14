<template>
  <div>
    Wyniki wyszukiwania frazy: {{ query }}
    <v-row class="mt-5">
      <v-col @click="showAlbum(album)" class="ml-5" cols="2" v-for="album in this.result" :key="album._id">
        <div class="d-flex justify-center align-center">
          <img class="albumImg" v-auth-image="`${link}${album.thumbnail}`" />
        </div>
        <span class="albumTitle mt-3 d-flex justify-center align-center"> {{ album.name }} </span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['query'],
  data() {
    return {
      link: `${process.env.VUE_APP_BASE_URL}/image/`,
      result: [],
    };
  },

  created() {
    this.search();
  },
  watch: {
    query: function () {
      this.search();
    },
  },
  computed: {
    ...mapGetters({
      images: 'getImages',
      albums: 'getAlbums',
    }),
  },
  methods: {
    search() {
      const regex = new RegExp(`${this.query}`, 'i');
      this.result = this.albums.filter((album) => album.name.match(regex));
    },
    showAlbum(album) {
      this.$router.push({ path: `/album/${album._id}` });
    },
  },
};
</script>

<style scoped>
.albumImg {
  border-radius: 50px;
  height: 15vh;
  max-width: 20vh;
}
</style>
