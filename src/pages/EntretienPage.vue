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
              <q-btn @click="openDialog(interview)">Détails</q-btn>
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
  
      <!-- Dialog pour les détails de l'entretien -->
      <q-dialog v-model="dialogOpen">
        <q-card>
          <q-card-section>
            <q-tabs v-model="tab" align="justify">
              <q-tab name="work" label="Travail effectué cette année" />
              <q-tab name="current-objectives" label="Objectifs actuels" />
              <q-tab name="next-year-objectives" label="Objectifs pour l'année prochaine" />
              <q-tab name="notes" label="Notes" />
              <q-tab name="rating" label="Évaluation" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="work">
                <q-input v-model="details.workDone" type="textarea" />
              </q-tab-panel>
              <q-tab-panel name="current-objectives">
                <q-input v-model="details.currentObjectives" type="textarea" />
              </q-tab-panel>
              <q-tab-panel name="next-year-objectives">
                <q-input v-model="details.nextYearObjectives" type="textarea" />
              </q-tab-panel>
              <q-tab-panel name="notes">
                <q-input v-model="details.notes" type="textarea" />
              </q-tab-panel>
              <q-tab-panel name="rating">
                <q-rating v-model="details.rating" max="5" />
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn v-close-popup flat label="Fermer" color="negative" />
            <q-btn flat label="Enregistrer" color="positive" @click="saveDetails" />
          </q-card-actions>
        </q-card>
      </q-dialog>
  
      
      <div class="fixed-bottom-right">
        <q-btn fab color="primary" icon="event" label="Convoquer entretien" @click="openConvokeDialog" />
      </div>
      <q-dialog v-model="convokeDialogOpen">
        <q-card>
          <q-card-section>
            <div class="text-h6">Convoquer un nouvel entretien</div>
            <q-select
              v-model="newInterview.interviewee_id"
              :options="userOptions"
              option-value="id"
              option-label="username"
              label="Choisir un interviewee"
              style="width: 100%"
            />
            <q-input v-model="newInterview.object" label="Objet de l'entretien" filled />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn v-close-popup flat label="Annuler" color="negative" />
            <q-btn flat label="Convoquer" color="positive" @click="convokeInterview" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import interviewsData from 'src/entretiens.json'
  import usersData from 'src/users.json'
  import { useLoginStore } from 'src/stores/loginStore'
  
  export default {
    setup() {
      const loginStore = useLoginStore()
      const userId = loginStore.user.id
      const users = ref(usersData)
      const interviews = ref([])
      const interviewerInterviews = ref([])
      const intervieweeInterviews = ref([])
      const dialogOpen = ref(false)
      const tab = ref('work')
      const details = ref({
        workDone: '',
        currentObjectives: '',
        nextYearObjectives: '',
        notes: '',
        rating: 3
      })
      const convokeDialogOpen = ref(false)
      const newInterview = ref({
        interviewee_id: '',
        object: ''
      })
      const userOptions = users.value.map(user => ({ id: user.id, username: user.username }))
  
      const getUsername = (id) => {
        const user = users.value.find(user => user.id === id)
        return user ? user.username : 'Inconnu'
      }
  
      const openDialog = (interview) => {
        dialogOpen.value = true
      }
  
      const saveDetails = () => {
        dialogOpen.value = false
        console.log('Details saved:', details.value)
      }
  
      const openConvokeDialog = () => {
        convokeDialogOpen.value = true
      }
  
      const convokeInterview = () => {
        console.log('Nouvel entretien convoqué:', newInterview.value)
        convokeDialogOpen.value = false
      }
  
      onMounted(() => {
        interviews.value = interviewsData
        interviewerInterviews.value = interviews.value.filter(interview => interview.interviewer_id === userId)
        intervieweeInterviews.value = interviews.value.filter(interview => interview.interviewee_id === userId)
      })
  
      return {
        interviewerInterviews,
        intervieweeInterviews,
        getUsername,
        openDialog,
        saveDetails,
        dialogOpen,
        tab,
        details,
        convokeDialogOpen,
        openConvokeDialog,
        newInterview,
        convokeInterview,
        userOptions
      }
    }
  }
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  .fixed-bottom-right {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
  </style>
  