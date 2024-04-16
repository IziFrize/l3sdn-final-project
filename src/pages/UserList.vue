<template>
    <q-table
      title="Liste des utilisateurs"
      :rows="users"
      :column="columns"
      row-key="id"
    />
  </template>
  
  <script>
  import axios from 'axios' // Assurez-vous que Axios est installé
  
  export default {
    data() {
      return {
        users: [],
        columns: [
          { name: 'username', required: true, label: 'Nom d’utilisateur', align: 'left', field: row => row.username, sortable: true },
          { name: 'role', label: 'Rôle', align: 'left', field: 'role', sortable: true },
          { name: 'manager', label: 'ID Manager', align: 'left', field: 'manager', sortable: true },
          { name: 'manages', label: 'Gère (IDs)', align: 'left', field: row => row.manages.join(', ') }
        ]
      }
    },
    mounted() {
      this.fetchUsers()
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('/path/to/your/users.json') // Modifiez ceci selon votre configuration
          this.users = response.data
        } catch (error) {
          
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Ajoutez ici des styles si nécessaire */
  </style>
  