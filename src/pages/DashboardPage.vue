<template>
    <div>
        <ManagesNumberCard class="top-left-card" />
        <MyManagerCard class="top-right-card" />
    </div>
</template>

<script>
import { useLoginStore } from 'stores/loginStore'
import { useRouter } from 'vue-router'
import ManagesNumberCard from 'components/ManagesNumberCard.vue'
import MyManagerCard from 'components/MyManagerCard.vue'

export default {
    name: 'DashboardPage',
    components: {
        ManagesNumberCard,
        MyManagerCard
    },
    setup() {
        const loginStore = useLoginStore()
        const router = useRouter()

        if (!loginStore.isAuthenticated) {
            router.push('/login')
        }
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
</style>