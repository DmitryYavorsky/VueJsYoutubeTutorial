<template>
<!--  <v-snackbar v-model="snackbar">Text</v-snackbar>-->
<!--  <v-btn dark @click="snackbar = true">Open Snackbar</v-btn>-->
  <form class="card auth-card" v-on:submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            v-bind:class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty  && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small v-if="$v.email.$dirty && !$v.email.required"
            class="helper-text invalid">Введите Email</small>
        <small v-else-if="$v.email.$dirty && !$v.email.email"
               class="helper-text invalid">Email некорректен</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            v-bind:class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty  && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small v-if="$v.password.$dirty && !$v.password.required" 
            class="helper-text invalid">Введите пароль</small>
        <small v-else-if="$v.password.$dirty  && !$v.password.minLength"
               class="helper-text invalid">Не меньше 6 символов</small>
        
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import messages from "@/common/messages"
export default {
  name: "login",
  data: () => ({
    email: "",
    password: "",
    snackbar: false
  }),
  mounted() {
    if(messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push("/");
      }
      catch (e)
      {
        
      }
    }
  },
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  }
}
</script>