<template>
  <v-row class="mt-16">
    <v-col xl="6" offset-xl="3" lg="8" offset-lg="2" sm="10" offset-sm="1">
      <h3 class="mb-5 font-weight-medium d-flex justify-center">Zmień hasło do konta</h3>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="oldPassword"
          outlined
          :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showOldPassword ? 'text' : 'password'"
          label="Stare hasło"
          class="input-group--focused d-flex align-center"
          required
          @click:append="showOldPassword = !showOldPassword"
        ></v-text-field>
        <v-text-field
          v-model="newPassword"
          outlined
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Nowe hasło"
          class="input-group--focused d-flex align-center"
          required
          :rules="passwordRules"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-text-field
          v-model="replyNewPassword"
          outlined
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Powtórz nowe hasło"
          class="input-group--focused d-flex align-center"
          :rules="passwordRules"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        {{ errorMsg }}
        <v-btn block large color="primary" @click="changePassword"> Zmień hasło </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ChangePassword',
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      replyNewPassword: '',
      showPassword: false,
      showOldPassword: false,
      valid: true,
      errorMsg: '',
      passwordRules: [(v) => !!v || 'Hasło jest wymagane', () => this.newPassword == this.replyNewPassword || 'Hasła nie są takie same'],
    };
  },
  methods: {
    ...mapActions({
      fetchChangePassword: 'changePassword',
    }),
    async changePassword() {
      if (this.$refs.form.validate()) {
        await this.fetchChangePassword({ oldPassword: this.oldPassword, newPassword: this.newPassword });
      }
      this.$refs.form.reset();
    },
  },
};
</script>

<style></style>
