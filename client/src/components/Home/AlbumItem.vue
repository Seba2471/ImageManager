<template>
  <div>
    <p class="text-center">{{ albumName }}</p>
  </div>
</template>

<script>
export default {
  props: ['albumName'],
  name: 'AlbumItem',
};
// <v-img
//   src="https://cdn-icons.flaticon.com/png/512/2383/premium/2383422.png?token=exp=1637878403~hmac=bf74d0e68a5fccecaf83781ae5b4ed8d"
//   :max-width="100"
//   class="d-flex justify-center"
// ></v-img>
</script>

<style lang="scss" scoped></style>
