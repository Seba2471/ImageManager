<template>
  <v-app class="App" :style="{ background: $vuetify.theme.themes.light.background }">
    <v-row>
      <v-col :cols="navCols">
        <NavComponent @clicked="changeMini" />
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col :cols="mainCols">
            <TopBar />
          </v-col>
        </v-row>

        <v-row justify-center>
          <v-col :cols="mainCols">
            <v-main>
              <router-view />
            </v-main>
          </v-col>
        </v-row>
        <div class="mt-16">
          Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from
          <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import TopBar from './components/TopBar.vue';
import NavComponent from './components/NavComponents/Nav.vue';

export default {
  name: 'App',
  components: {
    NavComponent,
    TopBar,
  },
  data() {
    return {
      navCols: 2,
      mainCols: 10,
    };
  },
  methods: {
    changeMini(value) {
      if (value) {
        this.navCols = 1;
        this.mainCols = 12;
      } else {
        this.navCols = 2;
        this.mainCols = 10;
      }
    },
  },
};
</script>

<style scoped>
.App {
  font-family: 'Montserrat', sans-serif;
}
</style>
