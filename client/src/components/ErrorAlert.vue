<template>
  <v-row v-if="!responseStatus" class="ml-16 mr-16 mt-10">
    <v-col>
      <v-alert type="error"> Coś poszło nie tak, spróbuj ponownie później. </v-alert>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props: ['responseStatus'],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
