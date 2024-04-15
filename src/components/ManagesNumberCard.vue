<template>
    <div>
        <q-card class="manages-number-card">
            <q-card-section class="text-center">
                <div class="title">Nombre de managés</div>
                <div class="number">{{ loginStore.user.manages.length }}</div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import { useLoginStore } from 'stores/loginStore'

export default {
    setup() {
        const loginStore = useLoginStore()

        return {
            loginStore
        }
    }
}
</script>

<style scoped>
.title {
    font-size: 14px;
    color: #333;
}

.number {
    font-size: 36px;
    color: #000;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.manages-number-card {
    background-color: #f2e6ff;
    width: 200px;
    height: 150px;
    border-radius: 10px;
}
</style>