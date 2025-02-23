<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back title="Заявка" v-else-if="request.data">
    <p><strong>Имя</strong>: {{ request.data.fio }}</p>
    <p><strong>Телефон &#9990</strong>: {{ request.data.phone }}</p>
    <p><strong>Сумма &#36</strong>: {{ currency(request.data.amount) }}</p>
    <p><strong>Статус</strong>: <app-status :type="request.data.status"></app-status></p>

    <div class="form-control">
      <label for="status">Изменить Статус:</label>
      <select id="status" v-model="status">
        <option value="done">Завершён</option>
        <option value="canceled">Отменён</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <div>
      <button class="btn danger" @click="remove">Удалить</button>
      <button class="btn" @click="update" v-if="hasChanges">Обновить</button>
    </div>
  </app-page>
  <h3 v-else class="text-center text-white">
    Заявки с ID = {{ $route.params.id }} нет.
  </h3>
</template>

<script>
import {ref, onMounted, computed, h} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import AppPage from "@/components/ui/AppPage.vue";
import { useStore } from "vuex";
import AppLoader from "@/components/ui/AppLoader.vue";
import AppStatus from "@/components/ui/AppStatus.vue";
import { currency } from "../../utils/currency.js";
export default {
  setup() {
    const loading = ref(false);
    const route = useRoute();
    const router = useRouter()
    const store = useStore()
    const status = ref()
    const request = ref({})
    onMounted(async () => {
      loading.value = true;
      request.value = await store.dispatch('request/loadById', route.params.id)
      console.log('req:', request.value.data)
      status.value = request.value.data?.status
      loading.value = false;
    })
    console.log(request)

    const hasChanges = computed(() => request.value.data.status !== status.value)
    const remove = async () => {
      await store.dispatch('request/remove', route.params.id)
      await router.push('/')
    }
    const update = async () => {
      const data = {...request.value.data, status: status.value, id: route.params.id}
      await store.dispatch('request/update', data)
      request.value.data.status = status.value
    }
    return { loading, request, currency, remove, update, status, hasChanges }
  },

  components: { AppPage, AppLoader, AppStatus },
}
</script>

<style lang="css" scoped>
p {
  text-align: center;
}

div {
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
}

div .form-control {
  margin: 16px auto;
  width: fit-content;
}
</style>