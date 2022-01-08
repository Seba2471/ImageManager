<template>
  <div>
    <v-row class="d-flex align-center justify-center mt-10">
      <v-col cols="4" md="4" sm="4" offset="1">
        <Step number="1" title="Podaj tytuł" :disable="!showTitle" />
      </v-col>
      <v-col cols="5" md="4" sm="4" class="ml-7">
        <Step number="2" title="Wybierz miniaturkę" :disable="!showThumbnail" />
      </v-col>
    </v-row>
    <v-row class="d-flex align-center justify-center mt-10">
      <v-col cols="5" md="4" sm="4" class="ml-7">
        <Step number="3" title="Wybierz zdjęcia" :disable="!showImages" />
      </v-col>
      GOTOWE
    </v-row>
  </div>
</template>

<script>
import Step from './Step.vue';
export default {
  components: { Step },
  props: ['showTitle', 'showThumbnail', 'showImages'],
};
</script>

<style lang="scss" scoped></style>
