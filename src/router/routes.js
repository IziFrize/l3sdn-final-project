const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DashboardPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'users', component: () => import('pages/UserList.vue') },
      { path: 'entretiens', component: () => import('pages/EntretienPage.vue') },

    ]
  },

  // Always leave this as last one
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
