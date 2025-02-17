<template>
  <div class="container with-nav">
    <app-message></app-message>
    <router-view />
  </div>
</template>

<script>
import AppMessage from "@/components/ui/AppMessage.vue";
export default {
  components: {AppMessage}
}
</script>

<style lang="scss" scoped>

</style>