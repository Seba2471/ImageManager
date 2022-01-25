<template>
  <div class="album_wrp" @mouseover="albumHover = true" @mouseleave="albumHover = false">
    <div class="d-flex justify-center align-center">
      <img @click.prevent="showAlbum(album)" @error="replaceImg" :class="albumClass" v-auth-image="`${link}${album.thumbnail}`" />
      <div v-if="(!disableSelect && albumHover) || isSelected" :class="iconClass" fab x-small>
        <v-icon @click="selectAlbum(album._id)" @mouseover="iconHover = true" @mouseleave="iconHover = false" :color="iconColor" medium>
          mdi-checkbox-marked-circle
        </v-icon>
      </div>
    </div>

    <span class="albumTitle mt-3 d-flex justify-center align-center"> {{ album.name }} </span>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import imgError from '../../assets/img-error.png';
import { baseUrl } from '../../config.js';

export default {
  props: ['album', 'disableSelect'],
  name: 'AlbumItem',
  data() {
    return {
      link: `${baseUrl}/image/`,
      albumHover: false,
      iconHover: false,
      isSelected: false,
      iconColor: '',
      albumClass: '',
      iconClass: 'icon',
      counter: 0,
      imgError: imgError,
    };
  },
  watch: {
    selected: function (val) {
      if (val.includes(this.album._id)) {
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
          this.albumClass = 'albumHover';
          this.iconColor = 'white';
        } else {
          this.iconColor = '';
          this.albumClass = '';
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      selected: 'getSelectedAlbums',
    }),
  },
  methods: {
    ...mapMutations({
      addSelected: 'addSelectedAlbums',
      setSelected: 'setSelectedAlbums',
    }),
    ...mapActions({
      isMobile: 'isMobile',
    }),
    replaceImg(e) {
      e.target.src = this.imgError;
    },
    async showAlbum(album) {
      this.counter++;
      const mobile = await this.isMobile(960);
      if (this.counter == 1) {
        this.timer = setTimeout(() => {
          if (!mobile) {
            this.$router.push({ path: `/album/${album._id}` });
          }
          this.counter = 0;
        }, 300);

        return;
      }
      clearTimeout(this.timer);
      this.counter = 0;
      this.$router.push({ path: `/album/${album._id}` });
    },
    setSelectedStyles() {
      this.isSelected = true;
      this.albumClass = 'selectAlbum';
      this.iconClass = 'selectIcon';
      this.iconColor = 'blue';
    },
    notSelectedStyles() {
      this.isSelected = false;
      this.iconClass = 'icon';
      this.albumClass = '';
      this.iconColor = '';
    },
    selectAlbum(id) {
      if (!this.isSelected) {
        this.setSelectedStyles();
        this.addSelected(id);
      } else {
        this.notSelectedStyles();
        this.setSelected(this.selected.filter((item) => item != id));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  border-radius: 50px;
  height: 23vh;
  max-width: 23vh;
}
img:hover {
  filter: brightness(90%);
}
.imgHover {
  filter: brightness(90%);
}
.album_wrp {
  display: inline-block;
  position: relative;
}
.icon {
  position: absolute;
  top: 0;
  left: 0;
  margin: 5px 5px;
}
.albumTitle {
  font-size: 18px;
  font-weight: bold;
}
.selectIcon {
  position: absolute;
  top: 0;
  left: 0;
  margin: 17px 17px;
}
.selectAlbum {
  padding: 20px;
  background-color: var(--v-blueLight-base);
}
</style>
