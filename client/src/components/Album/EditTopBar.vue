<template>
  <v-row class="d-flex align-center justify-end">
    <v-col offset-xl="7" class="d-flex align-center justify-end">
      <v-col cols="4" md="3" xl="6">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="checkAllImages">
            <v-icon> mdi-check-circle-outline </v-icon>
            <span class="ml-3">Zaznacz wszystko</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" md="3" xl="6">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="uncheckAllImages">
            <v-icon> mdi-checkbox-blank-circle-outline</v-icon>
            <span class="ml-3">Odznacz wszystko</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" xl="3" v-if="!mobile && isSelected">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="deleteSelectedImages">
            <v-icon> mdi-trash-can-outline </v-icon>
            <span class="ml-3">Usuń</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" xl="3">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="saveEdit()">
            <v-icon> mdi-check-underline-circle-outline</v-icon>
            <span class="ml-3">Zapisz</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" xl="3">
        <v-row>
          <v-col class="customButton pa-3 d-flex align-center justify-center" @click="cancelEdit()">
            <v-icon> mdi-cancel</v-icon>
            <span class="ml-3">Anuluj</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col sm="2" md="1" v-if="mobile && isSelected" class="d-flex align-center justify-center">
        <v-menu left offset-y transition="scale-transition">
          <template v-slot:activator="{ on, attrs }"><v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon> </template>
          <v-list>
            <v-list-item>
              <v-col class="customButton pa-3 d-flex align-center justify-center" @click="deleteSelectedImages">
                <v-icon> mdi-trash-can-outline </v-icon>
                <span class="ml-3">Usuń</span>
              </v-col>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  name: 'ImgTopBar',
  props: ['images'],
  data() {
    return {
      isSelected: false,
      mobile: false,
    };
  },

  created() {
    this.fetchAlbums();
    this.setSelected([]);
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
      selected: 'getSelected',
      albums: 'getAlbums',
    }),
  },
  methods: {
    ...mapMutations({
      setSelected: 'setSelected',
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
      this.$emit('editStatus', false);
    },
    checkAllImages() {
      const result = this.images.map((a) => a._id);
      this.setSelected(result);
    },
    uncheckAllImages() {
      this.setSelected([]);
    },
    deleteSelectedImages() {
      console.log(this.selected);
      this.$emit('saveImagesToDelete', this.selected);
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
