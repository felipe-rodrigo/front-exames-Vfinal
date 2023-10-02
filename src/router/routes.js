
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: '/medicos', name: 'medicos', component: () => import('src/pages/medico/MedicosPage.vue') },
      { path: 'form-post/:id?', name: 'formPost', component: () => import('pages/FormPost.vue') },
      { path: 'form-post/:id?', name: 'formPost', component: () => import('pages/FormPost.vue') },
      { path: 'form-post/:id?', name: 'formPost', component: () => import('pages/FormPost.vue') }
    ]
  },
  // {
  //   path: "/medico",
  //   component: () => import("src/layouts/MainLayout.vue"),
  //   children: [
  //     {
  //       name: "medico-create",
  //       path: "adicionar",
  //       component: () => import("pages/medico/MedicoCreate.vue"),
  //     },
  //     {
  //       name: "medico-list",
  //       path: "listar",
  //       component: () => import("pages/medico/MedicoList.vue"),
  //     },
  //   ],
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
