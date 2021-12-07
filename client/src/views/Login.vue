<template>
  <v-row class="mt-16">
    <v-col cols="6" offset="3">
      <v-card class="pa-16" rounded elevation="10">
        <h1 class="text-center mb-5">PICTURES</h1>
        <p class="mb-5 font-weight-medium">Zaloguj się i zarządzaj swoimi zdjęciami!</p>
        <v-form>
          <v-text-field v-model="userEmail" outlined label="E-mail" required :error="wrong_data"></v-text-field>
          <v-text-field
            v-model="userPassword"
            outlined
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Hasło"
            class="input-group--focused d-flex align-center"
            :error-messages="wrong_data ? 'Email lub hasło są nie prawidłowe' : ''"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-btn block large color="primary" @click="login"> Zaloguj </v-btn>
          <a href="/" class="d-flex justify-end ma-2 text-decoration-none font-weight-medium"> Nie pamiętasz hasła?</a>
          <v-divider class="mt-5" />
          <router-link class="mt-5 font-weight-bold d-flex justify-center text-decoration-none text-red" :to="{ name: 'Register' }">
            Jesteś nowym użytkownikiem ? Zarejestruj się!
          </router-link>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      userEmail: 'sebix@gmail.com',
      userPassword: 'tajne',
      showPassword: false,
      wrong_data: false,
    };
  },
  methods: {
    ...mapActions({
      fetchLogin: 'login',
    }),
    login() {
      this.fetchLogin({ email: this.userEmail, password: this.userPassword }).then((response) => {
        if (!response) {
          this.wrong_data = true;
        } else {
          this.wrong_data = false;
          this.$router.push('/');
        }
      });
    },
  },
};
</script>
