<template>
  <div class="img_wrp" @mouseover="hover = true" @mouseleave="hover = false">
    <img @click="showOverlay(image.file_name)" :class="imgClass" v-auth-image="`${link}${image.file_name}`" :height="height" />
    <div v-if="hover || isSelect" :class="iconClass" fab x-small>
      <v-icon @click="IconSelect(image._id)" @mouseover="IconHover" @mouseleave="IconNoHover" :color="iconColor" medium>
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
      hover: false,
      iconColor: '#eeeeee',
      isSelect: false,
      imgClass: '',
      iconClass: 'icon',
    };
  },
  watch: {
    selected: function (val) {
      if (val.length == 0) {
        this.isSelect = false;
        this.hover = false;
        this.iconColor = '#ffffff';
        this.imgClass = '';
        this.iconClass = 'icon';
      }
      if (this.selectOne) {
        if (!val.includes(this.image._id)) {
          this.isSelect = false;
          this.hover = false;
          this.iconColor = '#ffffff';
          this.imgClass = '';
          this.iconClass = 'icon';
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
    IconSelect(id) {
      if (!this.isSelect) {
        this.isSelect = true;
        this.iconColor = 'blue';
        this.imgClass = 'selectImg';
        this.iconClass = 'selectIcon';
        if (!this.selected.includes(id)) {
          if (this.selectOne) {
            this.setSelected([id]);
          } else {
            this.addSelected(id);
          }
        }
      } else {
        this.isSelect = false;
        this.iconColor = '#ffffff';
        this.imgClass = '';
        this.iconClass = 'icon';
        this.setSelected(this.selected.filter((item) => item != id));
      }
    },
    IconHover() {
      if (!this.isSelect) {
        this.iconColor = '#ffffff';
        this.imgClass = 'imgHover';
      }
    },
    IconNoHover() {
      if (!this.isSelect) {
        this.iconColor = '#eeeeee';
        this.imgClass = '';
      }
    },
    hideIcon() {
      console.log('Hide');
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
  background-color: #aec8fa;
}
</style>
