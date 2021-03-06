<template>
  <v-row justify-center>
    <v-col xl="5" lg="8" md="12" sm="12" xs="12" offset-xl="7" offset-lg="4" class="d-flex align-center justify-end">
      <v-col cols="4">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="checkAllImages">
            <v-icon> mdi-check-circle-outline </v-icon>
            <span class="ml-3">Zaznacz wszystko</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" v-if="isSelected">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="uncheckAllImages">
            <v-icon> mdi-checkbox-blank-circle-outline</v-icon>
            <span class="ml-3">Odznacz wszystko</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5" v-if="isSelected && !mobile">
        <v-row>
          <v-menu bottom close-on-click>
            <template v-slot:activator="{ on, attrs }">
              <v-col class="customButton pa-3 d-flex align-center justify-center" v-bind="attrs" v-on="on">
                <v-icon> mdi-plus-box-outline </v-icon>
                <span class="ml-3">Dodaj do albumu</span>
              </v-col>
            </template>

            <v-list class="pa-5">
              <v-list-item @click="createNewAlbum" class="customButton pl-4 pr-4">
                <v-list-item-title> <v-icon> mdi-plus-box-outline </v-icon> <span class="ml-2">Nowy album </span> </v-list-item-title>
              </v-list-item>
              <v-list-item
                @click="addImagesToExistAlbum(album._id)"
                class="customButton pl-4 pr-4 d-flex align-center justify-center"
                v-for="album in this.albums"
                :key="album._id"
              >
                <v-list-item-title>
                  <v-icon> mdi-panorama-variant </v-icon> <span class="ml-2"> {{ album.name }} </span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-col>
      <v-col cols="3" v-if="isSelected && !mobile">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="deleteSelectedImages">
            <v-icon> mdi-trash-can-outline </v-icon>
            <span class="ml-3">Usuń</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="8" lg="8" md="7" sm="5" v-if="!isSelected">
        <v-select
          class="sortButton d-flex align-center justify-center"
          v-model="sortPick"
          :items="sortItems"
          menu-props="auto"
          label="Sortowanie"
          hide-details
          prepend-icon="mdi-sort"
        ></v-select>
      </v-col>
      <v-col cols="1" v-if="isSelected && mobile" class="d-flex align-center justify-center">
        <v-menu left offset-y transition="scale-transition">
          <template v-slot:activator="{ on, attrs }"><v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon> </template>
          <v-list color="background">
            <v-list-item>
              <v-menu bottom close-on-click>
                <template v-slot:activator="{ on, attrs }">
                  <v-col class="customButton pa-3 d-flex align-center justify-center" v-bind="attrs" v-on="on">
                    <v-icon> mdi-plus-box-outline </v-icon>
                    <span class="ml-3">Dodaj do albumu</span>
                  </v-col>
                </template>

                <v-list class="pa-5" color="background">
                  <v-list-item @click="createNewAlbum" class="customButton pl-4 pr-4">
                    <v-list-item-title> <v-icon> mdi-plus-box-outline </v-icon> <span class="ml-2">Nowy album </span> </v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="addImagesToExistAlbum(album._id)"
                    class="customButton pl-4 pr-4 d-flex align-center justify-center"
                    v-for="album in this.albums"
                    :key="album._id"
                  >
                    <v-list-item-title>
                      <v-icon> mdi-panorama-variant </v-icon> <span class="ml-2"> {{ album.name }} </span>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item>
            <v-list-item>
              <v-col class="customButton pa-3 d-flex align-center justify-start" @click="deleteSelectedImages">
                <v-icon> mdi-trash-can-outline </v-icon>
                <span class="ml-3">Usuń</span>
              </v-col>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-col>
    <ErrorAlert :responseStatus="status" />
  </v-row>
</template>

<script>
import ErrorAlert from '../ErrorAlert.vue';
import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  components: { ErrorAlert },
  name: 'ImgTopBar',
  props: ['images'],
  data() {
    return {
      windowWidth: window.innerWidth,
      sortPick: 'Od najnowszych',
      sortItems: ['Od najnowszych', 'Od najstarszych', 'Data utworzenia(od najnowsze)', 'Data utworzenia(od najstarsze)'],
      isSelected: false,
      window: {
        width: 0,
        height: 0,
      },
      mobile: false,
      status: true,
    };
  },
  computed: {
    ...mapGetters({
      selected: 'getSelectedImages',
      albums: 'getAlbums',
    }),
  },
  watch: {
    selected: function (val) {
      if (val.length == 0) {
        this.isSelected = false;
      } else {
        this.isSelected = true;
      }
    },
    sortPick: async function (val) {
      this.$emit('sortPick', val);
    },
  },
  created() {
    this.fetchAlbums();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    ...mapMutations({
      setSelected: 'setSelectedImages',
    }),
    ...mapActions({
      addAlbumImages: 'addAlbumImages',
      deleteImages: 'deleteImages',
      fetchAlbums: 'fetchAlbums',
      createAlbum: 'createAlbum',
    }),
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;

      if (this.window.width < 1264) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    },
    checkAllImages() {
      const result = this.images.map((a) => a._id);
      this.setSelected(result);
    },
    uncheckAllImages() {
      this.setSelected([]);
    },
    async addImagesToExistAlbum(id) {
      this.status = await this.addAlbumImages({ id, images: this.selected });
      this.setSelected([]);
    },
    createNewAlbum() {
      this.$router.push('/album/new');
    },
    async deleteSelectedImages() {
      if (await this.$confirm('Czy na pewno chcesz usunąć?')) {
        this.status = await this.deleteImages(this.selected);
      }
    },
  },
};
</script>
<style>
.sortButton {
  margin: 0 0;
  padding: 0 0;
}
</style>
