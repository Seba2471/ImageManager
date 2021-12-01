<template>
  <v-row>
    <v-row>
      <v-col class="d-flex justify-center" v-for="image in images" :key="image.id" cols="10" sm="6" md="4" lg="3" xl="2">
        <img
          @mouseover="showIcon"
          @click="imgAction(image.file_name, image._id)"
          v-auth-image="`${link}${image.file_name}`"
          width="200"
          height="200"
        />
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-row>
        <v-col cols="10" class="d-flex justify-end">
          <v-icon active-class="activeIcon" @click="closeImg" style="margin-right: -22%; margin-top: -3%"> mdi-close</v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-icon x-large @click="prevImg">mdi-chevron-left</v-icon>

        <img v-auth-image="`${link}${this.currentImg}`" :height="this.overlayImageSize" />
        <v-icon x-large @click="nextImg">mdi-chevron-right</v-icon>
      </v-row>
    </v-overlay>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'ImgGrid',
  props: ['images', 'selectMode'],
  data() {
    return {
      link: `${process.env.VUE_APP_BASE_URL}/image/`,
      overlay: false,
      currentImg: '',
      currentPosition: 0,
      windowWidth: window.innerWidth,
      overlayImageSize: '300px',
    };
  },
  computed: {
    ...mapGetters({
      selected: 'getSelected',
    }),
  },
  methods: {
    ...mapMutations({
      addSelected: 'addSelected',
      setSelected: 'setSelected',
    }),
    imgAction(file_name, id) {
      if (this.selectMode) {
        if (this.selected.includes(id)) {
          this.setSelected(this.selected.filter((item) => item != id));
        } else {
          this.addSelected(id);
        }
      } else {
        document.documentElement.style.overflow = 'hidden';
        if (this.windowWidth > 1904) {
          this.overlayImageSize = '900px';
        } else if (this.windowWidth < 1904 && this.windowWidth > 1264) {
          this.overlayImageSize = '700px';
        }
        this.currentPosition = this.images
          .map(function (e) {
            return e.file_name;
          })
          .indexOf(file_name);
        this.currentImg = file_name;
        this.overlay = true;
      }
    },
    showSelectedIcon(id) {
      if (this.selectMode) {
        if (this.selected.includes(id)) {
          return true;
        }
        return false;
      }
      return false;
    },
    closeImg() {
      this.currentPosition = 0;
      this.overlay = false;
      document.documentElement.style.overflow = 'auto';
    },
    prevImg() {
      try {
        this.currentImg = this.images[this.currentPosition - 1].file_name;
        this.currentPosition -= 1;
      } catch (e) {
        this.currentImg = this.images[this.currentPosition].file_name;
      }
    },
    nextImg() {
      try {
        this.currentImg = this.images[this.currentPosition + 1].file_name;
        this.currentPosition += 1;
      } catch (e) {
        this.currentImg = this.images[this.currentPosition].file_name;
      }
    },
  },
};
</script>
<style></style>
