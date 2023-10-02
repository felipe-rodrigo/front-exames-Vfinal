<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated style="background-color: white;">
      <q-toolbar>
        <q-btn
          dense
          round
          color="primary"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-primary text-bold">
          SGE - Sistema de Gestão de Exames
        </q-toolbar-title>

        <div class="q-ma-sm">
          <img src="/public/logo-gov-mt.png" alt="logo-govmt" style="height: 50px; max-width: 170px">
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
          style="font-weight: 1000; color: black;"
        >
          MENU
        </q-item-label>

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
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    route: { name: 'home' }
  },
  {
    title: 'Exame',
    caption: '',
    icon: 'home',
    route: { name: 'exame-listar' }
  },
  {
    title: 'Médico',
    caption: '',
    icon: 'home',
    route: { name: 'medico-listar' }
  },
  {
    title: 'Paciente',
    caption: '',
    icon: 'home',
    route: { name: 'paciente-listar' }
  },
  {
    title: 'Usuário',
    caption: '',
    icon: 'home',
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
