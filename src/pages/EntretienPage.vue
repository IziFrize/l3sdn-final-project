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
            <q-btn
                flat
                dense
                round
                icon="visibility"
                color="accent"
                @click="openDialog(interview)"
              />
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
  
      <q-dialog v-model="dialogOpen">
        <q-card class="dialog-content">
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
        <q-btn fab color="accent" icon="event" label="Convoquer entretien" @click="openConvokeDialog" />
      </div>
      <q-dialog v-model="convokeDialogOpen">
        <q-card>
          <q-card-section>
            <div class="text-h6">Convoquer un nouvel entretien</div>
            <q-select
              v-if="userOptions"
              :options="userOptions"
              option-value="id"
              option-label="username"
              label="Choisir un interviewee"
              style="width: 100%"
            />
            <q-input v-model="newInterview.object" label="Objet de l'entretien" filled />
            <q-input v-model="newInterview.date" filled type="date" label="Date de l'entretien" />
            <q-input v-model="newInterview.time" filled type="time" label="Heure de l'entretien" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn v-close-popup flat label="Annuler" color="negative" />
            <q-btn flat label="Convoquer" color="positive" @click="convokeInterview" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import interviewsData from 'src/entretiens.json'
  import usersData from 'src/users.json'
  import { useLoginStore } from 'src/stores/loginStore'
  import axios from 'axios'
  const interviews = ref([])
  const users = ref([])
  const userOptions = ref([])

  onMounted(async () => {
   
        const interview = await axios.get('https://rod-apps-restis-api-01.azurewebsites.net/api/gregsacha/entretiens')
        interviews.value = interview.data
        //console.log(interviews)
        const userz = await axios.get('https://rod-apps-restis-api-01.azurewebsites.net/api/gregsacha/users')
        users.value = userz.data
        //console.log(users)
        interviewerInterviews.value = interviews.value.filter(interview => interview.interviewer_id === userId)
        intervieweeInterviews.value = interviews.value.filter(interview => interview.interviewee_id === userId)
        userOptions.value = users.value.map(user => user.username)
  
      })

      const loginStore = useLoginStore()
      const userId = loginStore.user.id
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
        object: '',
        date: '',
        time: ''
      })
      
  
    const getUsername = (id) => {
      const user = users.value.find(user => user.id === id)
      return user ? user.username : 'Inconnu'
    }
  
      const openDialog = (interview) => {
        dialogOpen.value = true
      }
  
      const saveDetails = () => {
        dialogOpen.value = false
    
      }
  
      const openConvokeDialog = () => {
        convokeDialogOpen.value = true
      }
  
      const convokeInterview = () => {
        const newEntretien = {
          id: interviews.value.length + 1,
          date: newInterview.value.date,
          time: newInterview.value.time,
          interviewee_id: newInterview.value.interviewee_id,
          interviewer_id: userId,
          comments: newInterview.value.object
        }
  
        interviews.value.push(newEntretien)
        interviewerInterviews.value.push(newEntretien)
        convokeDialogOpen.value = false
        newInterview.value = { interviewee_id: '', object: '', date: '', time: '' }
  
    
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
  .dialog-content {
        width: 1200px;
        max-width: 90%;
    }
  </style>
  