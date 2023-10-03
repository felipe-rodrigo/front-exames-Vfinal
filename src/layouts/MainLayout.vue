<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated class="primary">
      <q-toolbar>
        <q-btn
          dense
          flat
          color="white"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="my-font">
          SGE - Sistema de Gerenciamento de Exames
        </q-toolbar-title>

        <div class="q-ma-xs">
          <img src="/public/logo_mt_branco.png  " alt="logo-govmt" style="height: 7vh; width: 18vh">
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list class="q-mt-md">
        <!-- <q-item-label
          header
          style="font-weight: 600; color: black; font-size: 24px"
        >
          Menu
        </q-item-label> -->

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal elevated >
        <q-toolbar class="justify-center">
          <div class="row items-center ">
            <div style="font-size: larger;">&copy;</div><q-toolbar-title class="my-font"> 2023 SGE - Todos os direitos reservados.</q-toolbar-title>
          </div>
        </q-toolbar>
      </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { defineComponent, ref } from 'vue'

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'fa-solid fa-home',
    route: { name: 'home' }
  },
  {
    title: 'Exame',
    caption: '',
    icon: 'fa-solid fa-file-signature',
    route: { name: 'exame-listar' }
  },
  {
    title: 'Medico',
    caption: '',
    icon: 'fa-solid fa-stethoscope',
    route: { name: 'medico-listar' }
  },
  {
    title: 'Paciente',
    caption: '',
    icon: 'fa-solid fa-person',
    route: { name: 'paciente-listar' }
  },
  {
    title: 'Usuario',
    caption: '',
    icon: 'fa-solid fa-user-lock',
    route: { name: 'usuario-listar' }
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style>
.my-font {
  font-family: 'unineue';
};
.my-font-bold {
  font-family: 'unineue-bold';
}
</style>
