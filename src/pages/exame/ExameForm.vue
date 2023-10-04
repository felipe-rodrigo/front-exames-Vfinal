<template>
  <q-page padding>
    <q-card round class="q-ma-md q-pa-lg">
      <div class="text-bold my-font text-h4 q-ma-md q-pb-md">Formulario de Exames</div>
      <q-form
      @submit="onSubmit"
      class="row q-col-gutter-lg"
    >
    <!-- <q-input
        outlined=""
        v-model="form.title"
        label="Nome do Exame"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      /> -->
      <q-input
        outlined=""
        rounded
        v-model="form.nomeMedico"
        label="Médico Responsável"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      />
      <q-input
        outlined=""
        rounded
        v-model="form.nomePaciente"
        label="Paciente"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      />
      <q-input
        outlined=""
        rounded
        v-model="form.dataHoraExame"
        label="Data do Exame"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      />
      <!-- <q-input
        outlined=""
        v-model="form.observacao"
        label="Observação"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      /> -->
      <div class="col-lg-12 col-xs-12">
        <q-editor
        v-model="form.observacao"
        label="Observação"
        min-height="5rem"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"/>
      </div>
      <div label="Resultado" class="col-lg-12 col-xs-12">
        <q-editor
        v-model="form.resultado"

        min-height="5rem"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"/>
      </div>
      <!-- <q-input
        outlined=""
        v-model="form.resultado"
        label="Resultado"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      /> -->
      <div class="col-12 q-gutter-md">
        <q-btn
        rounded
        label="Salvar"
        color="primary"
        class="float-right q-py-md"
        icon="fa-solid fa-check"
        type="submit"
        />
        <q-btn
        outline
        rounded
        label="Cancelar"
        color="primary"
        class="float-right q-py-md"
        icon="fa-solid fa-cancel"
        :to="{ name: 'exame-listar' }"
        />
      </div>
    </q-form>
    </q-card>

  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import exameService from 'src/services/exameService'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import UseApi from 'src/composables/UseApi'
export default defineComponent({
  name: 'ExameForm',
  setup () {
    const { post, getById, update } = exameService() // é realmente usado?
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      nomeMedico: '',
      nomePaciente: '',
      dataHoraExame: '',
      observacao: '',
      resultado: ''

    })

    onMounted(async () => {
      // if (route.params.id) {
      //   getPost(route.params.id)
      // }
      const id = route?.params?.id
      if (id) {
        $q.loading.show()
        exameService('exames/listar').getById(id).then((data) => {
          form.value.nomeMedico = data.nomeMedico
          form.value.nomePaciente = data.nomePaciente
          form.value.dataHoraExame = data.dataHoraExame
          form.value.observacao = data.observacao
          form.value.resultado = data.resultado
          $q.loading.hide()
        })
      }
    })

    // const getPost = async (id) => {
    //   try {
    //     const response = await getById(id)
    //     form.value = response
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    const onSubmit = async (id) => {
      // try {
      //   if (form.value.id) {
      //     await update(form.value)
      //   } else {
      //     await post(form.value)
      //   }
      //   $q.notify({ message: 'Salvo com sucesso', icon: 'check', color: 'positive' })
      //   router.push({ name: 'home' })
      // } catch (error) {
      //   console.error(error)
      // }

      try {
        if (id) {
          // await update(form.value)
          const { data } = await UseApi('/exames/editar').update(form.value)
          debugger
          console.log('CONSOLE DO EDITAR', data)
        } else {
          // await post(form.value)
          const data = await UseApi('/exames/adicionar').post(form.value)
          console.log('CONSOLE DO ADICIONAR', data)
        }
        $q.notify({ message: 'Salvo com sucesso', icon: 'check', color: 'positive' })
        router.push({ name: 'exame-listar' })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      form,
      route, // não era retornado
      onSubmit
    }
  }
})
</script>
