<template>
  <app-page back title="Ответы на вопросы">
    <question-item
        v-for="q in questions"
        :key="q.title"
        :question="q"
    ></question-item>
  </app-page>
</template>

<script>
import AppPage from "@/components/ui/AppPage.vue";
import QuestionItem from "@/components/question/QuestionItem.vue";
export default {
  setup() {
    const questions = [
      {title: 'Что есть в данной системе', text: 'Тут есть всё, для того, чтобы смотреть, какие заявки человек добавлял'},
      {title: 'Как тут работает авторизация', text: 'Всё реализовано через Firebase'}
    ]
    return {questions}
  },
  components: {AppPage, QuestionItem},
}
</script>