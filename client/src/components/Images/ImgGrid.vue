<template>
  <v-row class="mt-3 d-flex justify-center">
    <ul v-if="!mobile" class="mr-10">
      <li @click="showImg(image.file_name)" v-for="(image, index) in this.images" :key="index">
        <Img
          class="ma-3 imgComponent"
          @showImageOverlay="showOverlay"
          :image="image"
          :height="imgHeight"
          :selectOne="selectOne"
          :isSelected="true"
          :disableSelect="disableSelect"
        />
      </li>
      <li></li>
    </ul>
    <v-row v-if="mobile" class="ma-5">
      <v-col class="d-flex justify-center" :cols="mobileCols" v-for="(image, index) in this.images" :key="index">
        <Img class="ma-3 imgComponent" @showMobileImageOverlay="showMobileOverlay" :image="image" :height="imgHeight" />
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-row>
        <v-col class="d-flex justify-end">
          <v-icon active-class="activeIcon" @click="closeImg" style="margin-top: -1%"> mdi-close</v-icon>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex align-center">
          <v-icon style="height: 40px" x-large @click="prevImg">mdi-chevron-left</v-icon>
        </v-col>

        <img v-auth-image="`${link}${this.currentImg}`" :height="this.overlayImageSize" />
        <v-col class="d-flex align-center">
          <v-icon style="height: 40px" x-large @click="nextImg">mdi-chevron-right</v-icon>
        </v-col>
      </v-row>
    </v-overlay>
  </v-row>
</template>

<script>
import Img from './Img.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  props: ['images', 'imgHeight', 'mobileCols', 'selectOne', 'disableSelect'],
  components: { Img },
  name: 'ImgGrid',
  data() {
    return {
      link: `${process.env.VUE_APP_BASE_URL}/image/`,
      overlay: false,
      currentImg: '',
      currentPosition: 0,
      overlayImageSize: '300px',
      mobile: false,
    };
  },
  created() {},
  watch: {
    windowWidth: async function () {
      this.mobile = await this.isMobile(960);
      this.overlayResize();
    },
  },
  computed: {
    ...mapGetters({
      selected: 'getSelectedImages',
      windowWidth: 'getWidth',
    }),
  },
  methods: {
    ...mapMutations({
      addSelected: 'addSelectedImages',
      setSelected: 'setSelectedImages',
    }),
    ...mapActions({
      isMobile: 'isMobile',
    }),
    overlayResize() {
      if (this.windowWidth > 1904) {
        this.overlayImageSize = '900px';
      } else if (this.windowWidth < 1904 && this.windowWidth > 1264) {
        this.overlayImageSize = '700px';
      } else if (this.windowWidth < 1264 && this.windowWidth > 800) {
        this.overlayImageSize = '600px';
      }
    },
    showOverlay(val, fileName) {
      if (!this.mobile) {
        this.overlay = val;
        this.showImg(fileName);
      }
    },
    showMobileOverlay(val, fileName) {
      this.overlay = val;
      this.showImg(fileName);
    },
    showImg(file_name) {
      document.documentElement.style.overflow = 'hidden';
      this.currentPosition = this.images
        .map(function (e) {
          return e.file_name;
        })
        .indexOf(file_name);
      this.currentImg = file_name;
    },
    checkSelected(id) {
      if (this.selected.includes(id)) {
        return true;
      } else {
        return false;
      }
    },
    closeImg() {
      document.documentElement.style.overflow = 'auto';
      this.currentPosition = 0;
      this.overlay = false;
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
<style>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
}

li {
  margin-top: 2vh;
  height: 2%;
  flex-grow: 1;
}
li:last-child {
  flex-grow: 10;
}
@media (max-aspect-ratio: 1/1) {
  li {
    height: 20%;
  }
}
@media (max-height: 480px) {
  li {
    height: 80vh;
  }
}
@media (max-aspect-ratio: 1/1) and (max-width: 480px) {
  ul {
    flex-direction: row;
    padding-right: 24px;
  }

  li {
    height: auto;
    width: 100%;
  }
}
</style>
