<template>
  <v-row class="d-flex align-center mt-2">
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      class="ml-12"
      flat
      hide-no-data
      hide-details
      label="Szukaj"
      solo-inverted
      light
      prepend-icon="mdi-magnify"
    ></v-autocomplete>
    <v-col class="d-flex justify-end">
      <v-menu left offset-y transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <div class="d-flex align-center">seba4@gmail.com</div>

          <v-icon x-large v-bind="attrs" v-on="on">mdi-chevron-down</v-icon>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Wyloguj</v-list-item-title>
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
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
    };
  },
};
</script>

<style></style>
