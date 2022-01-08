<template>
  <v-app class="App" :style="{ background: $vuetify.theme.themes.light.background, color: $vuetify.theme.themes.light.text }">
    <TopBar v-if="isAuthenticated && !topBarMobile" class="topBar" />
    <TopBarMobile v-if="isAuthenticated && topBarMobile" class="topBar" />
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
        <v-main>
          <router-view />
        </v-main>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

import TopBar from './components/TopBar.vue';
import TopBarMobile from './components/TopBarMobile.vue';
import NavComponent from './components/Nav.vue';

export default {
  name: 'App',
  components: {
    NavComponent,
    TopBar,
    TopBarMobile,
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      mobile: false,
      topBarMobile: false,
    };
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    windowWidth: async function () {
      this.mobile = await this.isMobile(960);
      this.topBarMobile = await this.isMobile(1100);
    },
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'getIsAuthenticated',
      windowWidth: 'getWidth',
    }),
  },
  methods: {
    ...mapMutations({
      setHeight: 'setHeight',
      setWidth: 'setWidth',
    }),
    ...mapActions({
      isMobile: 'isMobile',
    }),
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      this.setWidth(window.innerWidth);
      this.setHeight(window.innerHeight);
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
