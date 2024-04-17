<template>
    <div class="dashboard">
        <div class="card-container">
            <ManagesNumberCard class="card" />
            <MyManagerCard class="card" />
            <NextInterviewCard class="card" />
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue'
import { useLoginStore } from 'stores/loginStore'
import { useRouter } from 'vue-router'
import ManagesNumberCard from 'components/ManagesNumberCard.vue'
import MyManagerCard from 'components/MyManagerCard.vue'
import NextInterviewCard from 'src/components/NextInterviewCard.vue'

export default {
    name: 'DashboardPage',
    components: {
        ManagesNumberCard,
        MyManagerCard,
        NextInterviewCard
    },
    setup() {
        const loginStore = useLoginStore()
        const router = useRouter()

        onMounted(() => {
            if (!loginStore.isAuthenticated) {
                router.push('/login')
            }
        })
    }
}
</script>

<style scoped>
.dashboard {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
}

.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.card {
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>