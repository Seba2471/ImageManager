<template>
  <v-app class="App" :style="{ background: $vuetify.theme.themes.light.background, color: $vuetify.theme.themes.light.text }">
    <TopBar v-if="isAuthenticated" class="topBar" />
    <v-row v-if="isAuthenticated">
      <div v-if="!mobile" class="navComponent ml-3">
        <NavComponent />
      </div>
      <v-col>
        <v-main>
          <router-view />
        </v-main>
      </v-col>
    </v-row>
    <v-row v-if="!isAuthenticated">
      <v-col>
        <v-main
          >{{ txt }}
          <router-view />
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

import TopBar from './components/TopBar.vue';
import NavComponent from './components/Nav.vue';

export default {
  name: 'App',
  components: {
    NavComponent,
    TopBar,
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      mobile: false,
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'getIsAuthenticated',
    }),
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;

      if (this.window.width < 960) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    },
  },
};
</script>

<style>
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
.customButton:hover {
  background-color: var(--v-greyLight-base);
  border-radius: 25px;
}
.customButton {
  color: var(--v-text-base);
}
</style>
