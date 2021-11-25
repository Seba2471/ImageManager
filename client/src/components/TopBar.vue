<template>
  <v-row>
    <v-col class="d-flex justify-end">
      <v-menu left offset-y transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-icon x-large v-bind="attrs" v-on="on">mdi-account</v-icon>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {};
  },
};
</script>

<style></style>
