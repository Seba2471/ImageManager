<template>
  <v-row class="mt-16">
    <v-col cols="6" offset="3">
      <v-card class="pa-16" rounded elevation="10">
        <h1 class="text-center mb-5">PICTURES</h1>
        <p class="mb-5 font-weight-medium">Zaloguj się i zarządzaj swoimi zdjęciami!</p>
        <v-form>
          <v-text-field v-model="email" outlined label="E-mail" required></v-text-field>
          <v-text-field
            outlined
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Hasło"
            class="input-group--focused d-flex align-center"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-btn block large color="primary" @click="validate"> Zaloguj </v-btn>
          <a href="/" class="d-flex justify-end ma-2 text-decoration-none font-weight-medium"> Nie pamiętasz hasła?</a>
          <v-divider class="mt-5" />
          <router-link class="mt-5 font-weight-bold d-flex justify-center text-decoration-none text-red" :to="{ name: 'register' }">
            Jesteś nowym użytkownikiem ? Zarejestruj się!
          </router-link>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
};
</script>
