<template>
  <v-container>
    <v-card light color="background" min-width="800px">
      <v-row>
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
              light
              color="primary"
              @change="Preview_image"
              v-model="files"
              label="Wybierz zdjęcia"
              multiple
            ></v-file-input>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center" v-for="(url, index) in urls" :key="index" sm="6" md="4" lg="3" xl="3">
            <div class="img_wrp">
              <img :src="url" width="70" height="70" />
              <div class="selectIcon">
                <v-icon color="red" small> mdi-close </v-icon>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="!isEmpty" cols="4" class="d-flex align-center">
            <v-btn v-if="!isEmpty" block color="primary" @click="submitImages"> Prześlij zdjęcia </v-btn>
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

<style lang="scss" scoped>
.selectIcon {
  margin-top: -12px;
  margin-right: -10px;
}
.wrapper {
  padding: 50px;
  margin-bottom: -50px;
}
</style>
