<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="col-12 flex justify-center items-center my-font wrap">
          <div class="flex-center">
            SGE - Sistema de Gerenciamento de Exames
          </div>
          <img class="" src="../../public/logo_mt_branco.png" alt="Governo de Mato Grosso">
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted } from "vue";
//import useApi from "src/composables/UseApi";

export default defineComponent({
  name: "LoginLayout",

  setup() {
    //const { getBrand } = useApi();
    onMounted(() => {
      //getBrand()
    });
    return {};
  },
});
</script>

<style>
.my-font {
  font-family: 'unineue';
};
.my-font-bold {
  font-family: 'unineue-bold';
}
img {
  height: 7vh;
  width: 18vh;
}
</style>
