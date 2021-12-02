<template>
  <v-container>
    <v-card light color="background" class="uploaderCard">
      <v-row class="mb-5">
        <v-col class="d-flex justify-end mt-1 mr-2">
          <v-icon @click="changeOverlay"> mdi-close </v-icon>
        </v-col>
      </v-row>
      <div class="wrapper">
        <v-row style="margin-top: -40px">
          <v-col cols="12">
            <v-file-input
              show-size
              counter
              prepend-icon="mdi-camera"
              color="secondary"
              @change="Preview_image"
              v-model="files"
              label="Wybierz zdjęcia"
              multiple
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <ul>
            <li v-for="(url, index) in urls" :key="index">
              <div class="img_wrp">
                <img :src="url" height="100px" />
                <div class="deleteIcon">
                  <v-icon @click="deleteImg(url)" color="red" small> mdi-close </v-icon>
                </div>
              </div>
            </li>
            <li></li>
          </ul>
        </v-row>
        <v-row class="mt-5">
          <v-col @click="submitImages" cols="4" offset="4" v-if="!isEmpty" class="d-flex align-center justify-center customButton">
            <v-icon> mdi-tray-arrow-up </v-icon>
            <div class="d-flex align-center ml-2">Prześlij</div>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      urls: [],
      files: [],
      isEmpty: true,
    };
  },
  watch: {
    files: function (val) {
      if (val.length == 0) {
        this.isEmpty = true;
      }
    },
  },
  methods: {
    ...mapActions({
      addImages: 'addImages',
    }),
    changeOverlay() {
      this.$emit('close', false);
    },
    Preview_image() {
      this.isEmpty = false;
      this.files.map((file) => this.urls.push(URL.createObjectURL(file)));
    },
    deleteImg(val) {
      const index = this.urls.indexOf(val);
      this.urls = this.urls.filter((url) => url != val);
      this.files.splice(index, 1);
    },
    submitImages() {
      this.addImages({
        files: this.files,
      });
      this.$emit('close', false);
    },
  },
};
</script>

<style scoped>
.uploaderCard {
  min-width: 800px;
  max-width: 1000px;
}
.deleteIcon {
  position: absolute;
  top: -10px;
  right: -5px;
}
.img_wrp {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
img {
  margin-left: 5px;
}
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
.wrapper {
  padding: 50px;
}
</style>
