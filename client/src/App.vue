<template>
  <v-app class="App" :style="{ background: $vuetify.theme.themes.light.background, color: $vuetify.theme.themes.light.text }">
    <TopBar class="topBar" />
    <v-row>
      <div cols="2" class="navComponent">
        <NavComponent />
      </div>
      <v-col>
        <v-main>
          <router-view />
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import TopBar from './components/TopBar.vue';
import NavComponent from './components/Nav.vue';

export default {
  name: 'App',
  components: {
    NavComponent,
    TopBar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.App {
  font-family: 'Montserrat', sans-serif;
}
.topBar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  margin-bottom: 12px;
}
.navComponent {
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  padding-right: 1%;
}
</style>
