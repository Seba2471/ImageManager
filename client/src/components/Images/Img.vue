<template>
  <div class="img_wrp">
    <img @mouseover="hover = true" @mouseleave="hover = false" v-auth-image="`${link}1638299280824.jpg`" height="250" />
    <div v-if="hover" class="selectIcon" fab x-small>
      <v-icon color="blue" medium> mdi-check </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: `${process.env.VUE_APP_BASE_URL}/image/`,
      hover: true,
    };
  },
  methods: {
    showIcon() {
      console.log('Hover');
    },
    hideIcon() {
      console.log('Hide');
    },
  },
};
</script>

<style lang="scss" scoped>
img:hover {
}
.img_wrp {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
.selectIcon {
  position: absolute;
  top: 0;
  left: 0;
  margin: 5px 5px;
}
</style>
