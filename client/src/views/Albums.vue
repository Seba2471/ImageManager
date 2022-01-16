<template>
  <div :class="selected.length > 0 ? 'mt-5 ma-8' : 'mt-10 ma-8'">
    <ManageAlbumsTopBar />
    <ErrorAlert :responseStatus="status" />
    <v-row>
      <v-col cols="6" xl="2" lg="3" @click="() => this.$router.push('/album/new')">
        <div class="d-flex justify-center align-center" style="height: 23vh"><v-icon x-large> mdi-plus-box-outline</v-icon></div>

        <span class="albumTitle mt-3 d-flex justify-center align-center"> Stwórz nowy album </span>
      </v-col>
      <v-col cols="6" xl="2" lg="3" v-for="album in this.albums" :key="album._id">
        <AlbumItem v-if="status" :album="album" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ErrorAlert from '../components/ErrorAlert.vue';
import AlbumItem from '../components/Album/AlbumItem.vue';
import ManageAlbumsTopBar from '../components/Album/ManageAlbumsTopBar.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: { ManageAlbumsTopBar, AlbumItem, ErrorAlert },
  name: 'Albums',
  data() {
    return {
      link: `${process.env.VUE_APP_BASE_URL}/image/`,
      status: true,
    };
  },
  computed: {
    ...mapGetters({
      albums: 'getAlbums',
      selected: 'getSelectedAlbums',
    }),
  },
  async created() {
    this.status = await this.fetchAlbums();
    this.setSelected([]);
  },
  methods: {
    ...mapMutations({
      setSelected: 'setSelectedAlbums',
    }),
    ...mapActions({
      fetchAlbums: 'fetchAlbums',
    }),
  },
};
</script>
