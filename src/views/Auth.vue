<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>
    <div :class="['form-control', {invalid: eError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur" autocomplete="email"/>
      <small v-if="eError">{{ eError }}</small>
    </div>
    <div :class="['form-control', {invalid: pError}]">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" @blur="pBlur" autocomplete="current-password"/>
      <small v-if="pError">{{ pError }}</small>
    </div>
    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <div class="text-danger" v-if="isTooManyAttempts">
      Вы слишком часто пытаетесь войти в систему. Попробуйте позже.
    </div>
  </form>
</template>

<script>

import {useLoginForm} from "@/use/login-form.js";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {error} from "../../utils/error.js";

export default {
setup() {
  const route = useRoute()
  const store = useStore()
  if (route.query.msg) {
    store.dispatch('setMessage', {
      value: error(route.query.msg),
      type: 'warning'
    })
  }
  return {...useLoginForm()}
}
}
</script>

<style lang="scss" scoped>

</style>