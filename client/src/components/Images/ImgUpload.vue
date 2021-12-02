<template>
  <v-container>
    <v-card light color="background" min-width="800px" max-width="1000">
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
              <div cols="2" class="img_wrp">
                <img :src="url" height="100" />
                <v-icon class="deleteIcon" color="red" small> mdi-close </v-icon>
              </div>
            </li>
            <li></li>
          </ul>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="4" offset="4" v-if="!isEmpty" class="d-flex align-center justify-center customButton">
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
.deleteIcon {
  position: absolute;
  top: 0;
  right: 0;
  margin: 2px 2px;
}
.img_wrp {
  display: inline-block;
  position: relative;
  cursor: pointer;
}
img {
  margin: 5px;
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
