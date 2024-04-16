<template>
    <q-page class="row">
      <div class="col-6">
        <h6 class="text-center">Entretiens en tant qu'interviewer</h6>
        <q-list bordered>
          <q-item v-for="interview in interviewerInterviews" :key="interview.id" clickable>
            <q-item-section>
              <q-item-label>{{ interview.date }} à {{ interview.time }}</q-item-label>
              <q-item-label caption>Nom de l'interviewee: {{ getUsername(interview.interviewee_id) }}</q-item-label>
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
              <q-item-label caption>Nom de l'interviewer: {{ getUsername(interview.interviewer_id) }}</q-item-label>
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
  import usersData from 'src/users.json' 
  import { useLoginStore } from 'src/stores/loginStore'
  
  export default {
    setup() {
      const interviews = ref([])
      const loginStore = useLoginStore() 
      const userId = loginStore.user.id
      const users = ref(usersData)
      const interviewerInterviews = ref([])
      const intervieweeInterviews = ref([])
  
      const getUsername = (id) => {
        const user = users.value.find(user => user.id === id)
        return user ? user.username : 'Inconnu'
      }
  
      onMounted(() => {
        interviews.value = interviewsData
        interviewerInterviews.value = interviews.value.filter(interview => interview.interviewer_id === userId)
        intervieweeInterviews.value = interviews.value.filter(interview => interview.interviewee_id === userId)
      })
  
      return {
        interviewerInterviews,
        intervieweeInterviews,
        getUsername
      }
    }
  }
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  </style>
  