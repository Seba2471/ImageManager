<template>
  <v-row class="d-flex align-center justify-end">
    <v-col cols="12" class="d-flex align-center justify-end">
      <v-col cols="11" sm="3" md="2" lg="2" xl="2" offset-xl="2">
        <v-row>
          <v-col v-if="!selectThumbnail" class="customButton pa-3 d-flex align-center justify-center" @click="checkAllImages">
            <v-icon> mdi-check-circle-outline </v-icon>
            <span class="ml-3">Zaznacz wszystko</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="!mobile && !selectThumbnail" cols="4" md="2" lg="2" xl="2">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="uncheckAllImages">
            <v-icon> mdi-checkbox-blank-circle-outline</v-icon>
            <span class="ml-3">Odznacz wszystko</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" md="2" lg="2" xl="1" v-if="!mobile && isSelected && !selectThumbnail">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="deleteSelectedImages">
            <v-icon> mdi-image-remove</v-icon>
            <span class="ml-3">Usuń</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" md="2" lg="3" xl="2" v-if="!mobile && !selectThumbnail && !isSelected">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="checkThumbnail">
            <v-icon> mdi-image-edit-outline </v-icon>
            <span class="ml-3">Wybierz miniaturkę</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" md="2" lg="3" xl="2" v-if="!mobile && selectThumbnail">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="saveThumbnail">
            <v-icon> mdi-check-underline-circle-outline </v-icon>
            <span class="ml-3">Zapisz miniaturkę</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="!selectThumbnail" cols="6" md="2" lg="2" xl="1">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="saveEdit()">
            <v-icon> mdi-check-underline-circle-outline</v-icon>
            <span class="ml-3">Zapisz</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" md="2" lg="2" xl="1">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="cancelEdit()">
            <v-icon> mdi-cancel</v-icon>
            <span class="ml-3">Anuluj</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" sm="1" md="1" v-if="mobile" class="d-flex align-center justify-end">
        <v-menu min-width="250px" left offset-y transition="scale-transition">
          <template v-slot:activator="{ on, attrs }"><v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon> </template>
          <v-list color="background">
            <v-list-item>
              <v-col class="customButton pa-3 d-flex align-center justify-left" @click="checkThumbnail">
                <v-icon> mdi-image-edit-outline </v-icon>
                <span class="ml-3">Wybierz miniaturkę</span>
              </v-col>
            </v-list-item>
            <v-list-item v-if="isSelected">
              <v-col class="customButton pa-3 d-flex align-center justify-left" @click="deleteSelectedImages">
                <v-icon> mdi-trash-can-outline </v-icon>
                <span class="ml-3">Usuń</span>
              </v-col>
            </v-list-item>
            <v-list-item v-if="isSelected">
              <v-col class="customButton pa-3 d-flex align-center justify-center" @click="uncheckAllImages">
                <v-icon> mdi-checkbox-blank-circle-outline</v-icon>
                <span class="ml-3">Odznacz wszystko</span>
              </v-col>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-col>
    <v-col v-if="mobile" cols="12" class="d-flex align-center justify-end">
      <v-col cols="6" md="3" lg="2" xl="1">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="saveEdit()">
            <v-icon> mdi-check-underline-circle-outline</v-icon>
            <span class="ml-3">Zapisz</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" md="3" lg="2" xl="1">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="cancelEdit()">
            <v-icon> mdi-cancel</v-icon>
            <span class="ml-3">Anuluj</span>
          </v-col>
        </v-row>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  name: 'ImgTopBar',
  props: ['images', 'albumId'],
  data() {
    return {
      isSelected: false,
      mobile: false,
      selectThumbnail: false,
    };
  },

  async created() {
    this.fetchAlbums();
    this.setSelected([]);
    this.mobile = await this.isMobile(1200);
  },
  watch: {
    selected: function (val) {
      if (val.length == 0) {
        this.isSelected = false;
      } else {
        this.isSelected = true;
      }
    },
    windowWidth: async function () {
      this.mobile = await this.isMobile(1200);
    },
  },
  computed: {
    ...mapGetters({
      windowWidth: 'getWidth',
      selected: 'getSelectedImages',
      albums: 'getAlbums',
    }),
  },
  methods: {
    ...mapMutations({
      setSelected: 'setSelectedImages',
    }),
    ...mapActions({
      deleteImage: 'deleteImage',
      fetchAlbums: 'fetchAlbums',
      isMobile: 'isMobile',
    }),
    saveEdit() {
      this.$emit('editStatus', true);
    },
    cancelEdit() {
      if (this.selectThumbnail) {
        this.selectThumbnail = false;
      } else {
        this.$emit('editStatus', false);
      }
    },
    checkAllImages() {
      const result = this.images.map((a) => a._id);
      this.setSelected(result);
    },
    uncheckAllImages() {
      this.setSelected([]);
    },
    deleteSelectedImages() {
      this.$confirm('Czy na pewno chcesz usunąć?').then(() => {
        this.$emit('saveImagesToDelete', this.selected);
        this.setSelected([]);
      });
    },
    checkThumbnail() {
      this.selectThumbnail = true;
      this.$emit('selectOne', true);
    },
    saveThumbnail() {
      this.selectThumbnail = false;
      this.$emit('saveThumbnail', true);
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
