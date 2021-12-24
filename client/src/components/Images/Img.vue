<template>
  <div class="img_wrp" @mouseover="imgHover = true" @mouseleave="imgHover = false">
    <img @click="showOverlay(image.file_name)" :class="imgClass" v-auth-image="`${link}${image.file_name}`" :height="height" />
    <div v-if="imgHover || isSelected" :class="iconClass" fab x-small>
      <v-icon @click="selectImg(image._id)" @mouseover="iconHover = true" @mouseleave="iconHover = false" :color="iconColor" medium>
        mdi-checkbox-marked-circle
      </v-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Img',
  props: ['image', 'height', 'selectOne'],
  data() {
    return {
      link: `${process.env.VUE_APP_BASE_URL}/image/`,
      imgHover: false,
      iconHover: false,
      isSelected: false,
      iconColor: '',
      imgClass: '',
      iconClass: 'icon',
    };
  },
  created() {
    if (this.selected.includes(this.image._id)) {
      this.setSelectedStyles();
    }
  },
  watch: {
    selected: function (val) {
      if (val.includes(this.image._id)) {
        this.setSelectedStyles();
      } else {
        this.isSelected = false;
        this.notSelectedStyles();
      }
    },
    iconHover: function (val) {
      if (this.isSelected) {
        if (val) {
          this.iconColor = 'white';
        } else {
          this.iconColor = 'blue';
        }
      } else {
        if (val) {
          this.imgClass = 'imgHover';
          this.iconColor = 'white';
        } else {
          this.iconColor = '';
          this.imgClass = '';
        }
      }
    },
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
    showOverlay(fileName) {
      this.$emit('showImageOverlay', true, fileName);
    },
    setSelectedStyles() {
      this.isSelected = true;
      this.imgClass = 'selectImg';
      this.iconClass = 'selectIcon';
      this.iconColor = 'blue';
    },
    notSelectedStyles() {
      this.isSelected = false;
      this.imgClass = '';
      this.iconColor = '';
    },
    selectImg(id) {
      if (!this.isSelected) {
        if (!this.selected.includes(id)) {
          if (this.selectOne) {
            this.setSelected([id]);
          } else {
            this.addSelected(id);
          }
        }
      } else {
        this.setSelected(this.selected.filter((item) => item != id));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
img:hover {
  filter: brightness(90%);
}
.imgHover {
  filter: brightness(90%);
}
.img_wrp {
  display: inline-block;
  position: relative;
}
.icon {
  position: absolute;
  top: 0;
  left: 0;
  margin: 5px 5px;
}
.selectIcon {
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px 10px;
}
.selectImg {
  padding: 20px;
  background-color: var(--v-blueLight-base);
}
</style>
