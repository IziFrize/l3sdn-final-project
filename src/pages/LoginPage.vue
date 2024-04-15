<template>
    <div class="login-page">
        <q-page class="q-pa-md">
            <q-card class="login-card">
                <q-card-section>
                    <h2 class="text-h6">Connexion</h2>
                </q-card-section>

                <q-card-section>
                    <q-input
                        v-model="username"
                        outlined
                        label="Username"
                        dense
                    ></q-input>
                    <q-input
                        v-model="password"
                        outlined
                        label="Password"
                        type="password"
                        dense
                    ></q-input>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn
                        color="primary"
                        label="Connexion"
                        @click="login"
                    ></q-btn>
                </q-card-actions>
            </q-card>
        </q-page>
    </div>
</template>

<script>
import users from 'src/users.json'
import { Notify } from 'quasar'
import { useLoginStore } from 'stores/loginStore'

export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        login() {
            const loginStore = useLoginStore()
            const user = users.find(u => u.username === this.username && u.password === this.password)
            if (user) {
                loginStore.login(user)
                this.$router.push('/')

            } else {
                Notify.create({
                    color: 'negative',
                    position: 'bottom',
                    message: 'Connexion échouée',
                    icon: 'report_problem',
                })
            }
        }
    }
}
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-card {
    max-width: 400px;
    width: 100%;
}
</style>