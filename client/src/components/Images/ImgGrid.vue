<template>
  <v-row class="mt-3 d-flex justify-center">
    <ul v-if="!mobile">
      <li @click="showImg(image.file_name)" v-for="(image, index) in this.images" :key="index">
        <Img class="ma-3 imgComponent" @showImageOverlay="showOverlay" :image="image" :height="imgHeight" :selectOne="selectOne" :isSelected="true" />
      </li>
      <li></li>
    </ul>
    <v-row v-if="mobile" class="ma-5">
      <v-col :cols="mobileCols" v-for="(image, index) in this.images" :key="index">
        <Img class="ma-3 imgComponent" :image="image" :height="imgHeight" />
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
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  props: ['imgHeight', 'mobileCols', 'selectOne'],
  components: { Img },
  name: 'ImgGrid',
  data() {
    return {
      link: `${process.env.VUE_APP_BASE_URL}/image/`,
      overlay: false,
      currentImg: '',
      currentPosition: 0,
      windowWidth: window.innerWidth,
      overlayImageSize: '300px',
      mobile: false,
    };
  },
  created() {
    if (this.windowWidth <= 1050) {
      this.mobile = true;
    }
    this.fetchImages();
    this.setSelected([]);
  },
  watch: {
    windowWidth: function (val) {
      console.log(val);
    },
    selected: function () {
      this.fetchImages();
    },
  },
  computed: {
    ...mapGetters({
      selected: 'getSelected',
      images: 'getImages',
    }),
  },
  methods: {
    ...mapMutations({
      addSelected: 'addSelected',
      setSelected: 'setSelected',
    }),
    ...mapActions({
      fetchImages: 'fetchImages',
    }),
    showOverlay(val, fileName) {
      this.overlay = val;
      this.showImg(fileName);
    },
    showImg(file_name) {
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
    },
    checkSelected(id) {
      if (this.selected.includes(id)) {
        console.log('true tu jets');
        return true;
      } else {
        return false;
      }
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
