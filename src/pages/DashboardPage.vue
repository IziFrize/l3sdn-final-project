<template>
    <div class="dashboard">
        <div class="card-container">
            <ManagesNumberCard class="card" />
            <MyManagerCard class="card" />
            <NextInterviewCard class="card" />
            
            <ul>
                <h2 >Ce qu'il manque sur notre projet</h2>
                <li>Possibilité de supprimer/ajouter un manager</li>
                <li>Gestion des rôles (actions/accès réservés selon le rôle)</li>
                <li>Faire en sorte que lorsque un entretien est ajouté, un manager soit ajouté dans la base de l'API (actuellement ajouté seulement en local)</li>
                <li>Certaines User Stories ne sont pas respectées</li>
                <li>Lorsque l'on recharge la page, on perd l'ID de l'utilisateur mais on n'est pas renvoyé sur la page de login</li>
                <li>Les entretiens ne sont pas triés par date</li>
                <li>Site responsive</li>
                
                
            </ul>
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
    padding: 35px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
}
li {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
}


</style>