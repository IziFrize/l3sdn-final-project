<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar v-if="$route.path !== '/login'">
        <q-btn
          flat
          dense
          round
          icon="home"
          aria-label="Accueil"
          to="/"
        />
        <q-btn
          flat
          dense
          round
          icon="people"
          aria-label="Liste des collaborateurs"
          to="/users"
        />
        <q-btn
          flat
          dense
          round
          icon="assignment"
          aria-label="Entretiens"
          to="/entretiens"
        />
        <q-btn
          flat
          dense
          round
          icon="logout"
          aria-label="Déconnexion"
          @click="logout"
        />
        <q-toolbar-title class="q-ml-md">
          Cét'RM
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          icon="dark_mode"
          toggle-color="yellow"
          @click="toggleDarkMode"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useLoginStore } from 'stores/loginStore'
import { useRoute } from 'vue-router'
import { Dark } from 'quasar'

export default defineComponent({
  name: 'MainLayout',

  methods: {
            toggleDarkMode() {
              Dark.toggle()
            }
          },

  setup () {
    const loginStore = useLoginStore()
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logout () {
        loginStore.logout()
      }
    }
  }
})
</script>

