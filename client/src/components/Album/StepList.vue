<template>
  <v-row class="d-flex align-center justify-center mt-10">
    <v-col xl="2" lg="3" md="3">
      <Step number="1" title="Podaj tytuł" :disable="!showTitle" />
    </v-col>
    <v-col xl="2" lg="3" md="3" class="ml-7">
      <Step number="2" title="Wybierz miniaturkę" :disable="!showThumbnail" />
    </v-col>
    <v-col xl="2" lg="3" md="3" class="ml-7">
      <Step number="3" title="Wybierz zdjęcia" :disable="!showImages" />
    </v-col>
    GOTOWE
  </v-row>
</template>

<script>
import Step from './Step.vue';
export default {
  components: { Step },
  props: ['showTitle', 'showThumbnail', 'showImages'],
};
</script>

<style lang="scss" scoped></style>
