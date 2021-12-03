<template>
  <v-row class="mt-3 d-flex justify-center">
    <ul v-if="!mobile">
      <li v-for="(image, index) in this.images" :key="index">
        <Img class="ma-3 imgComponent" :image="image" :height="imgHeight" />
      </li>
      <li></li>
    </ul>
    <div v-if="mobile">
      <v-col v-for="(image, index) in this.images" :key="index">
        <Img class="ma-3 imgComponent" :image="image" />
      </v-col>
    </div>
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
import Img from './Img.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  props: ['imgHeight'],
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
  watch: {
    windowWidth: function (val) {
      console.log(val);
    },
  },
  created() {
    if (this.windowWidth <= 750) {
      this.mobile = true;
    }
    this.fetchImages();
    this.setSelected([]);
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
    height: 30%;
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

  .imgComponent {
    width: 100%;
    max-height: 75vh;
    min-width: 0;
  }
}
</style>
