<template>
  <v-app class="App" :style="{ background: $vuetify.theme.themes.light.background }">
    <v-row>
      <v-col cols="2">
        <NavComponent />
      </v-col>
      <v-col cols="8">
        <TopBar />
        <v-row>
          <v-col>
            <v-main> <router-view /> </v-main
          ></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import TopBar from './components/TopBar.vue';
import NavComponent from './components/NavComponents/Nav.vue';

export default {
  name: 'App',
  components: { NavComponent, TopBar },
  data() {
    return {};
  },
};
</script>
<style scoped>
.App {
  font-family: 'Montserrat', sans-serif;
}
</style>
