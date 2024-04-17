<template>
    <div>
        <q-card class="my-manager-card">
            <q-card-section class="text-center">
                <div class="title">Mon Manager</div>
                <div v-if="getManagerName" class="name">{{ getManagerName }}</div>
                <div v-else class="name">-</div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import { computed } from 'vue'
import users from 'src/users.json'
import { useLoginStore } from 'stores/loginStore'

export default {
    setup() {
        const loginStore = useLoginStore()

        
        const getManagerName = computed(() => {
            if (loginStore.user && loginStore.user.manager !== null && users[loginStore.user.manager]) {
                return users[loginStore.user.manager]['username']
            }
            return null
        })

        return {
            loginStore,
            getManagerName
        }
    }
}
</script>

<style scoped>
.title {
    font-size: 14px;
    color: #333;
}

.name {
    font-size: 36px;
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