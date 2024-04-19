<template>
  <div>
    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <q-btn
            flat
            dense
            round
            icon="edit"
            color="accent"
            @click="openEditDialog(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="dialogOpen" persistent>
      <q-card>
        <q-card-section class="row items-center q-gutter-sm">
          <q-input v-model="editableUser.username" filled label="Username" />
          <q-input v-model="editableUser.role" filled label="Role" />
          <q-input v-model="editableUser.date_of_birth" filled label="Date of Birth" mask="##/##/####" :rules="[val => /^\d{2}\/\d{2}\/\d{4}$/.test(val) || 'Date format must be DD/MM/YYYY']" />
          <q-input v-model="editableUser.salary" type="number" filled label="Salary" />
          <q-input v-model="editableUser.address" filled label="Address" />
          <q-input v-model="editableUser.phone" filled label="Phone" />
        </q-card-section>
        <q-card-section align="right">
          <q-btn flat label="Annuler" color="negative" @click="dialogOpen = false" />
          <q-btn flat label="Enregistrer" color="positive" @click="saveChanges" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>


<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const editableUser = ref({})
const dialogOpen = ref(false)   
const users = ref([])

onMounted(async () => {
  const user = await axios.get('https://rod-apps-restis-api-01.azurewebsites.net/api/gregsacha/users')
  users.value = user.data

})
    
    

    const columns = [
      { name: 'username', required: true, label: 'Username', align: 'left', field: 'username', sortable: true },
      { name: 'role', align: 'left', label: 'Role', field: 'role', sortable: true },
      {
        name: 'manager',
        align: 'left',
        label: 'Manager',
        field: row => {
          const manager = users.value.find(u => u.id === row.manager)
          return manager ? manager.username : ''
        },
        sortable: true
      },
      {
        name: 'manages',
        align: 'left',
        label: 'Managés',
        field: row => row.manages.map(id => {
          const user = users.value.find(u => u.id === id)
          return user ? user.username : 'N/A'
        }).join(', '),
        sortable: true
      },
      { name: 'edit', label: ' ', field: 'edit', sortable: false, align: 'center' }
    ]

    function openEditDialog(user) {
      editableUser.value = { ...user }
      dialogOpen.value = true
    }

    function saveChanges() {
      const index = users.value.findIndex(u => u.id === editableUser.value.id)
      if (index !== -1) {
        users.value[index] = { ...editableUser.value }
        dialogOpen.value = false
        
      }
    }

</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
}
</style>
