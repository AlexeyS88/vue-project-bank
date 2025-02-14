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
import {computed, watch} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from "vee-validate";

export default {
setup() {
  const {handleSubmit, isSubmitting, submitCount} = useForm()
  const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
      'email',
      yup
          .string()
          .trim()
          .required('Пожайлуста, введите email')
          .email('Необходимо ввести корректный email'),
  );
  const  MIN_LENGTH = 6;
  const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
      'password',
      yup
          .string()
          .trim()
          .required('Пожайлуста введите пароль')
          .min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`)
  );
  const isTooManyAttempts = computed(() => submitCount.value >= 3);
  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => submitCount.value = 0, 2000)
    }
  })
  const onSubmit = handleSubmit(values => {
    console.log('Form:', values);
  }, errors => {
    console.log('Errors:', errors)
  })
  return {
    email,
    password,
    eError,
    pError,
    eBlur,
    pBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts,
  };
}
}
</script>

<style lang="scss" scoped>

</style>