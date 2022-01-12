<template>
  <v-container>
    <v-row class="d-flex align-center justify-end mt-2">
      <v-col cols="2" v-if="!isEdit" @click="edit" class="customButton d-flex align-center justify-center">
        <v-icon> mdi-pencil-circle-outline</v-icon>
        <span class="ml-3">Edytuj </span>
      </v-col>
      <v-col v-if="isEdit" cols="12">
        <EditTopBar :images="this.album.images" @editStatus="editStatus" @saveImagesToDelete="saveImagesToDelete" />
      </v-col>
    </v-row>
    <v-row v-if="!isEdit">
      <v-col cols="12" class="d-flex align-center justify-center">
        <h1>{{ album.name }}</h1>
      </v-col>
    </v-row>
    <v-row v-if="isEdit">
      <v-col cols="8" offset="2" xl="4" offset-xl="4" md="6" offset-md="3" class="d-flex align-center justify-center titleInput">
        <v-text-field v-model="newTitle" :value="album.name" height="34px" class="titleInput text-input-blue"> </v-text-field>
      </v-col>
    </v-row>
    <ImgGrid class="d-flex align-center justify-start" :images="this.album.images" imgHeight="250px" :disableSelect="!isEdit" />
  </v-container>
</template>

<script>
import EditTopBar from '../components/Album/EditTopBar.vue';
import ImgGrid from '../components/Images/ImgGrid.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  components: { ImgGrid, EditTopBar },
  name: 'Album',
  props: ['id'],
  data() {
    return {
      selectMode: false,
      isEdit: false,
      newTitle: '',
      saveTitle: '',
      imagesToDelete: [],
    };
  },
  created() {
    this.fetchAlbums();
    this.setSelected([]);
  },
  computed: {
    album() {
      return this.$store.getters.getAlbumById(this.id);
    },
    ...mapGetters({
      selected: 'getSelectedImages',
    }),
  },
  watch: {
    id: function () {
      this.isEdit = false;
    },
  },
  methods: {
    ...mapMutations({
      setSelected: 'setSelectedImages',
      addAlbumImage: 'addAlbumImage',
    }),
    ...mapActions({
      fetchAlbums: 'fetchAlbums',
      changeAlbumName: 'changeAlbumName',
      deleteAlbumImages: 'deleteAlbumImages',
    }),
    editStatus(val) {
      this.isEdit = false;

      if (val) {
        if (this.newTitle != this.saveTitle) {
          this.changeAlbumName({ name: this.newTitle, id: this.album._id });
        }
        if (this.imagesToDelete.length > 0) {
          this.deleteAlbumImages({ id: this.album._id, images: this.imagesToDelete });
        }
      }
      this.setSelected([]);
    },
    saveImagesToDelete(val) {
      this.imagesToDelete = val;
    },
    edit() {
      this.isEdit = true;
      this.saveTitle = this.album.name;
      this.newTitle = this.album.name;
    },
  },
};
</script>

<style>
.titleInput input {
  font-size: 32px !important;
  font-weight: bold;
  color: var(--v-text-base) !important;
  text-align: center !important;
}
</style>
