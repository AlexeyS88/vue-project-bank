<template>
  <div class="filter">
    <div class="form-control">
      <label for="txt">Введите имя:</label>
      <input id="txt" type="text" placeholder="Введите имя" v-model="name">
    </div>
    <div class="form-control">
      <label for="status">Выберите статус:</label>
      <select id="status" v-model="status">
        <option disabled selected>Выберите статус</option>
        <option value="done">Завершён</option>
        <option value="canceled">Отменён</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button v-if="isActive" class="btn warning" @click="reset">Очистить</button>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(_, { emit }) {
    const name = ref()
    const status = ref()

    watch([name, status], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1],
      })
    })

    const isActive = computed(() => name.value || status.value)
    return {
      name,
      status,
      isActive,
      reset: () => {
        name.value = ''
        status.value = null
      }
    }
  }
}
</script>

<style lang="css" scoped>
select, input {
  background-color: bisque;
}
.filter {
  display: flex;
  align-items: end;
}
</style>