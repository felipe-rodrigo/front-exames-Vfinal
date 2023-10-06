const routes = [
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "loginDefault",
        component: () => import("src/pages/login/Login.vue"),
      },
      {
        path: "/",
        name: "login",
        component: () => import("src/pages/login/Login.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("pages/Register.vue"),
      },
      {
        path: "email-confirmation",
        name: "email-confirmation",
        component: () => import("pages/EmailConfirmation.vue"),
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        component: () => import("pages/ForgotPassword.vue"),
      },
      {
        path: "reset-password",
        name: "reset-password",
        component: () => import("pages/ResetPassword.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
      // Rotas Médicos
      {
        path: "/medicos",
        name: "medico-listar",
        component: () => import("src/pages/medico/MedicoPage.vue"),
      },
      {
        path: "/medicos/adicionar",
        name: "medico-adicionar",
        component: () => import("src/pages/medico/MedicoForm.vue"),
      },
      {
        path: "/medicos/:id",
        name: "medico-editar",
        component: () => import("src/pages/medico/MedicoForm.vue"),
      },

      // Rotas Exames
      {
        path: "/exames",
        name: "exame-listar",
        component: () => import("src/pages/exame/ExamePage.vue"),
      },
      {
        path: "/exames/adicionar",
        name: "exame-adicionar",
        component: () => import("src/pages/exame/ExameForm.vue"),
      },
      {
        path: "/exames/:id",
        name: "exame-editar",
        component: () => import("src/pages/exame/ExameForm.vue"),
      },

      // Rotas Pacientes
      {
        path: "/pacientes",
        name: "paciente-listar",
        component: () => import("src/pages/paciente/PacientePage.vue"),
      },
      {
        path: "/pacientes/adicionar",
        name: "paciente-adicionar",
        component: () => import("src/pages/paciente/PacienteForm.vue"),
      },
      {
        path: "/pacientes/:id",
        name: "paciente-editar",
        component: () => import("src/pages/paciente/PacienteForm.vue"),
      },
      // Rotas Usuários
      {
        path: "/usuarios",
        name: "usuario-listar",
        component: () => import("src/pages/usuario/UsuarioPage.vue"),
      },
      {
        path: "/usuarios/adicionar",
        name: "usuario-adicionar",
        component: () => import("src/pages/usuario/UsuarioForm.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
