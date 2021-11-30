<template>
  <v-main>
    <div class="mt-5 ml-2 mb-3">
      Moje zdjęcia
      <v-divider class="mb-3" width="120px" />
      <v-btn v-if="!selectMode" @click="changeSelectMode" small color="primary"> Zazanacz </v-btn>
      <v-btn v-if="!selectMode" @click="addImages" class="ml-2" small color="success"> Dodaj zdjęcia </v-btn>
      <v-menu v-if="selectMode" offset-y close-on-click>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on" small> Dodaj do albumu </v-btn>
        </template>
        <v-list>
          <v-list-item class="menu-item ma-3" v-for="album in albums" :key="album._id">
            <v-list-item-title class="text-center" @click="addToAlbum(album._id)">{{ album.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-if="selectMode" @click="addToNewAlbum" class="ml-2" small color="primary"> Stwórz nowy album </v-btn>
      <v-btn v-if="selectMode" @click="changeSelectMode" class="ml-2" small color="error"> Anuluj </v-btn>
    </div>

    <ImgGrid v-bind:selectMode="this.selectMode" v-bind:images="this.images"></ImgGrid>
  </v-main>
</template>

<script>
import ImgGrid from '../components/Images/ImgGrid.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Images',
  components: { ImgGrid },
  data() {
    return {
      selectMode: false,
      overlay: false,
    };
  },
  create() {
    this.fetchImages();
  },
  computed: {
    ...mapGetters({
      images: 'getImages',
      albums: 'getAlbums',
      selected: 'getSelected',
    }),
  },
  methods: {
    ...mapMutations({
      setSelected: 'setSelected',
    }),
    ...mapActions({
      fetchImages: 'fetchImages',
      addAlbumImages: 'addAlbumImages',
      createAlbum: 'createAlbum',
    }),
    changeSelectMode() {
      this.selectMode = !this.selectMode;
      if (this.selectMode) {
        this.setSelected([]);
      }
    },
    addImages() {},
    addToAlbum(id) {
      this.addAlbumImages({ id: id, images: this.selected });
      this.selectMode = !this.selectMode;
    },
    addToNewAlbum() {
      this.createAlbum({ name: 'Wakacje 2020', images: this.selected });
      this.selectMode = !this.selectMode;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-item:hover {
  background-color: #9155fd;
  border-radius: 25px;
}
</style>
