<template>
    <div>
        <ManagesNumberCard class="top-left-card" />
        <MyManagerCard class="top-right-card" />
        <NextInterviewCard class="top-middle-card" />
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
    .top-left-card {
        position: absolute;
        top: 70px;
        left: 10px;
        grid-column: 1 / span 3;
        grid-row: 1 / span 3;
    }

    .top-right-card {
        position: absolute;
        top: 70px;
        right: 10px;
        grid-column: 4 / span 3;
        grid-row: 1 / span 3;
    }

    .top-middle-card {
        position: absolute;
        top: 70px;
        left: 50%;
        transform: translateX(-50%);
        grid-column: 2 / span 3;
        grid-row: 1 / span 3;
    }
</style>