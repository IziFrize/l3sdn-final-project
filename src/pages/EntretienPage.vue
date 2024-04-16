<template>
    <q-page class="row">
      <div class="col-6">
        <h6 class="text-center">Entretiens en tant qu'interviewer</h6>
        <q-list bordered>
          <q-item v-for="interview in interviewerInterviews" :key="interview.id" clickable>
            <q-item-section>
              <q-item-label>{{ interview.date }} à {{ interview.time }}</q-item-label>
              <q-item-label caption>Nom de rendez-vous: {{ interview.interviewee_id }}</q-item-label>
              <q-item-label caption>{{ interview.comments }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-6">
        <h6 class="text-center">Entretiens en tant qu'interviewee</h6>
        <q-list bordered>
          <q-item v-for="interview in intervieweeInterviews" :key="interview.id" clickable>
            <q-item-section>
              <q-item-label>{{ interview.date }} à {{ interview.time }}</q-item-label>
              <q-item-label caption>Interviewer ID: {{ interview.interviewer_id }}</q-item-label>
              <q-item-label caption>{{ interview.comments }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-page>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import interviewsData from 'src/entretiens.json' 
  import { useLoginStore } from 'src/stores/loginStore'
  export default {
    setup() {
      const interviews = ref([])
      const loginStore = useLoginStore() 
      const userId = loginStore.user.id
      const interviewerInterviews = ref([])
      const intervieweeInterviews = ref([])

      onMounted(() => {
        interviews.value = interviewsData
        interviewerInterviews.value = interviews.value.filter(interview => interview.interviewer_id === userId)
        intervieweeInterviews.value = interviews.value.filter(interview => interview.interviewee_id === userId)
      })
      const getinterviewee = computed(() => {
            if (loginStore.user && loginStore.user.manager && users[loginStore.user.manager]) {
                return users[loginStore.user.manager]['username']
            }
            return null
        })
      
  
      return {
        interviewerInterviews,
        intervieweeInterviews
      }
    }
  }
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  </style>
  