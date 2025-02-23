<template>
  <div class="question" @click="isOpen = !isOpen">
    <div class="question-title"><span v-if="!isOpen">&#10149</span>{{question.title}}</div>
    <div class="question-body" v-if="isOpen">{{question.text}}</div>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  props: ['question'],
  setup() {
    return {
      isOpen: ref(false)
    }
  }
}
</script>

<style lang="css" scoped>
div.question div {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>