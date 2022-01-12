<template>
  <v-row v-if="isSelected" class="d-flex align-center justify-end">
    <v-col cols="12" class="d-flex align-center justify-end">
      <v-col cols="4" sm="3" md="2" lg="3" xl="2" offset-xl="2">
        <v-row>
          <v-col @click="CheckAllAlbums" class="customButton pa-3 d-flex align-center justify-center">
            <v-icon> mdi-check-circle-outline </v-icon>
            <span class="ml-3">Zaznacz wszystko</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="!mobile" cols="4" md="2" lg="3" xl="2">
        <v-row>
          <v-col @click="UnCheckAllAlbums" class="customButton pa-3 d-flex align-center justify-center">
            <v-icon> mdi-checkbox-blank-circle-outline</v-icon>
            <span class="ml-3">Odznacz wszystko</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" md="2" lg="2" xl="1">
        <v-row>
          <v-col @click="DeleteAlbums" class="customButton pa-3 d-flex align-center justify-center">
            <v-icon> mdi-trash-can-outline </v-icon>
            <span class="ml-3">Usuń</span>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1" sm="1" md="1" v-if="mobile && isSelected" class="d-flex align-center justify-end">
        <v-menu min-width="250px" left offset-y transition="scale-transition">
          <template v-slot:activator="{ on, attrs }"><v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon> </template>
          <v-list color="background">
            <v-list-item>
              <v-col class="customButton pa-3 d-flex align-center justify-left">
                <v-icon> mdi-trash-can-outline </v-icon>
                <span class="ml-3">Usuń</span>
              </v-col>
            </v-list-item>
            <v-list-item>
              <v-col class="customButton pa-3 d-flex align-center justify-center">
                <v-icon> mdi-checkbox-blank-circle-outline</v-icon>
                <span class="ml-3">Odznacz wszystko</span>
              </v-col>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-col>
    <v-col v-if="error">
      <v-alert type="error"> Coś poszło nie tak spróbuj ponownie poźniej. </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ManageAlbumsTopbar',
  data() {
    return {
      isSelected: false,
      mobile: false,
      error: false,
    };
  },
  watch: {
    selected: function (val) {
      if (val.length > 0) {
        this.isSelected = true;
      } else {
        this.isSelected = false;
      }
    },
    windowWidth: async function () {
      this.mobile = await this.isMobile(1200);
    },
  },
  computed: {
    ...mapGetters({
      windowWidth: 'getWidth',
      selected: 'getSelectedAlbums',
      albums: 'getAlbums',
    }),
  },
  methods: {
    ...mapMutations({
      addSelected: 'addSelectedAlbums',
      setSelected: 'setSelectedAlbums',
    }),
    ...mapActions({
      deleteAlbum: 'deleteAlbum',
      isMobile: 'isMobile',
    }),
    CheckAllAlbums() {
      const result = this.albums.map((a) => a._id);
      this.setSelected(result);
    },
    UnCheckAllAlbums() {
      this.setSelected([]);
    },
    async DeleteAlbums() {
      this.$confirm('Czy na pewno chcesz usunąć?').then(() => {
        this.selected.forEach((id) => {
          this.deleteAlbum({ id: id }).then((response) => {
            this.error = !response;
          });
        });
        this.isSelected = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
