<template>
  <div v-if="message" :class="['alert', message.type]">
    <p class="alert-title" v-if="title">{{title}}</p>
    <p>{{message.value}}</p>
    <span class="alert-close" @click="close">&times;</span>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed, isMemoSame} from "vue";

export default {
  setup() {
    const store = useStore()
    const TITLE_MAP = {
      primary: 'Успешно',
      danger: 'Ошибка',
      warning: 'Внимание'
    }
    const message = computed(() => store.state.message)
    const title = computed(() => message.value.type ? TITLE_MAP[message.value.type] : null)
    return {
      message,
      title,
      close: () => store.commit('clearMessage')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>