<template>
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
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model="name"
            v-bind:class="{invalid:  ($v.name.$dirty && !$v.name.required) }"
        >
        <label for="name">Имя</label>
        <small v-if="($v.name.$dirty && !$v.name.required)"
               class="helper-text invalid">Имя обязательно</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
          <small v-if="($v.agree.$dirty && !$v.agree.checked)"
                 class="helper-text invalid">Подтвердите согласие</small>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login" href="/">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "register",
  data:() =>  ({
    email: "",
    password: "",
    name: "",
    agree: false
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)},
    name: {required},
    agree: {checked: v=> v}
  },
  methods: {
    async submitHandler() {
      if(this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push("/")
      }
      catch (e)
      {
      }
    }
  }
}
</script>