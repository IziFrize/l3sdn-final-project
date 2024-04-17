<template>
    <div>
        <q-card class="my-manager-card">
            <q-card-section class="text-center">
                <div class="title">Prochain entretien</div>
                <div v-if="getInterviewDates" class="date">{{ getInterviewDates }}</div>
                <div v-else class="date">Pas d'entretien</div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import { computed } from 'vue'
import users from 'src/users.json'
import entretiens from 'src/entretiens.json'
import { useLoginStore } from 'stores/loginStore'

export default {
    setup() {
        const loginStore = useLoginStore()

        const getInterviewDates = computed(() => {
            var res = []
            if (loginStore.user && entretiens) {
                entretiens.forEach(e => {
                    if (e.interviewer_id === loginStore.user.id || e.interviewee_id === loginStore.user.id) {
                        res.push(e)
                    }
                })
            }
            const sortedDates = res.sort((a, b) => a.date - b.date)
            return sortedDates.length > 0 ? sortedDates[0].date : null
        })

        return {
            loginStore,
            getInterviewDates
        }
    }
}
</script>

<style scoped>
.title {
    font-size: 14px;
    color: #333;
}

.date {
    font-size: 30px;
    color: #000;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.my-manager-card {
    background-color: #f2e6ff;
    width: 200px;
    height: 150px;
    border-radius: 10px;
}
</style>