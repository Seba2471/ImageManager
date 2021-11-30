<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card min-width="500px" min-height="500px" color="grey">
          <v-file-input v-model="files" label="File input"></v-file-input>
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
      files: null,
    };
  },
  methods: {
    ...mapActions({
      addImages: 'addImages',
    }),
    submitImages() {
      this.addImages({ files: this.files });
    },
  },
};
</script>

<style lang="scss" scoped></style>
