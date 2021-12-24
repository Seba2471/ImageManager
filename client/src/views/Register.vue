<template>
  <v-row class="mt-16">
    <v-col xl="6" offset-xl="3" lg="8" offset-lg="2" sm="10" offset-sm="1">
      <v-card class="pa-16" rounded elevation="10">
        <h1 class="text-center mb-5">PICTLIST</h1>
        <p class="mb-5 font-weight-medium">Zarejestuj się i korzystaj za darmo!</p>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="userEmail"
            outlined
            label="E-mail"
            :error-messages="errorMsg == '' ? '' : errorMsg"
            required
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            v-model="userPassword"
            outlined
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Hasło"
            class="input-group--focused d-flex align-center"
            required
            :rules="passwordRules"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          <v-text-field
            v-model="userPasswordReply"
            outlined
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            label="Powtórz hasło"
            class="input-group--focused d-flex align-center"
            :rules="passwordRules"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
          {{ errorMsg }}
          <v-btn block large color="primary" @click="register"> Zarejestruj się </v-btn>
          <a href="/" class="d-flex justify-end ma-2 text-decoration-none font-weight-medium"> Nie pamiętasz hasła?</a>
          <v-divider class="mt-5" />
          <router-link class="mt-5 font-weight-bold d-flex justify-center text-decoration-none text-red" :to="{ name: 'Register' }">
            Masz już konto? Przejdz do logowania!
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
      userEmail: '',
      userPassword: '',
      userPasswordReply: '',
      showPassword: false,
      valid: true,
      errorMsg: '',
      emailRules: [(v) => !!v || 'E-mail jest wymagany', (v) => /.+@.+\..+/.test(v) || 'Podany e-mail jest nieprawidłowy'],
      passwordRules: [
        (v) => !!v || 'Hasło jest wymagane',
        (v) => v == this.userPasswordReply || 'Hasła nie są takie same',
        (v) => v == this.userPassword || 'Hasła nie są takie same',
      ],
    };
  },
  methods: {
    ...mapActions({
      apiRegister: 'register',
    }),
    async register() {
      if (this.$refs.form.validate()) {
        const result = await this.apiRegister({ email: this.userEmail, password: this.userPassword });
        if (result.emailError == 'Email already taken') {
          this.errorMsg = 'Podany e-mail jest już zajęty';
        }
        this.$router.push('/login');
      }
      this.$refs.form.reset();
    },
  },
};
</script>
