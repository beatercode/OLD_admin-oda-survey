<template>
  <div class="surveyview">
    <SurveyList />
  </div>
</template>

// @ is an alias to /src
<script>
import SurveyList from '@/components/SurveyList.vue'

export default {
  name: 'SurveyView',
  components: {
    SurveyList,
  },
}
</script>

<style scoped>
.surveyview {
  margin: auto;
  width: 90vw;
  max-width: 1200px;
}
</style>
