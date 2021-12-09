<template>
  <v-row>
    <v-col cols="1" class="circle-wrapper d-flex justify-end">
      <div
        :class="
          disable
            ? 'circle-disabled pa-7 rounded-circle d-flex align-center justify-center'
            : 'circle pa-7 rounded-circle d-flex align-center justify-center'
        "
      >
        {{ number }}
      </div>
    </v-col>
    <v-col cols="11" class="arrow">
      <div :class="disable ? 'title-disabled' : 'title'">{{ title }}</div>
      <div class="d-flex align-center">
        <v-divider />
        <v-icon x-large class="icon-disabled"> mdi-chevron-right </v-icon>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['number', 'title', 'disable'],
  data() {
    return {
      circleClass: 'circle pa-7 rounded-circle d-flex align-center justify-center',
      titleClass: 'title',
      iconClass: 'icon',
    };
  },
};
</script>

<style scoped>
.circle-wrapper {
  padding: 0 0;
}

.circle {
  width: 56px;
  height: 56px;
  font-weight: bold;
  background-color: var(--v-primary-base) !important;
}

.circle-disabled {
  width: 56px;
  height: 56px;
  font-weight: bold;
  color: var(--v-gray-base) !important;
  background-color: var(--v-grayLight-base) !important;
}

.arrow {
  padding: 0 0;
  height: 56px;
}

.title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: bold;
  height: 2.7vh;
  margin-left: -20px;
  margin-bottom: -20px;
  text-align: center;
}

.title-disabled {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: bold;
  line-height: 2rem;
  color: var(--v-gray-base) !important;
  height: 2.7vh;
  margin-left: -20px;
  margin-bottom: -20px;
  text-align: center;
}

.icon {
  margin-left: -20px;
}

.icon-disabled {
  margin-left: -20px;
  color: var(--v-gray-base) !important;
}

.disable-text {
  color: var(--v-gray-base) !important;
}

.disable-bg {
  background-color: var(--v-grayLight-base) !important;
}
</style>
