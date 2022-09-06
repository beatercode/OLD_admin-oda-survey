<template>
  <div class="home">
    <DashboardHome/>
    <img class="img-oda-logo" alt="oda logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import DashboardHome from '@/components/DashboardHome.vue'

export default {
  name: 'HomeView',
  components: {
    DashboardHome,
  },
}
</script>

<style scoped>
.img-oda-logo {
  width: 200px;
  height: 200px;
  margin-top: 40px;
}
</style>
