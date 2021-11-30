<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card min-width="500px" min-height="500px" color="grey">
          <v-file-input @change="Preview_image" v-model="files" label="File input" multiple></v-file-input>
          <v-btn @click="submitImages"> Dodaj </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      files: [],
    };
  },
  methods: {
    ...mapActions({
      addImages: 'addImages',
    }),
    Preview_image() {},
    submitImages() {
      this.addImages({ files: this.files });
      this.$emit('clicked', false);
      console.log(this.files);
    },
  },
};
</script>

<style lang="scss" scoped></style>
