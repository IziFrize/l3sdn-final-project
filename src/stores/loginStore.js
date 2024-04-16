import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
    state: () => ({
        isAuthenticated: false,
        user: null,
    }),
    actions: {
        login(user) {
            this.isAuthenticated = true
            this.user = user
        },
        logout() {
            this.isAuthenticated = false
            this.user = null
            window.location.replace('/')
        },
    },
})