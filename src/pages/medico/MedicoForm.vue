<template>
  <q-page padding>
    <q-card class="q-ma-md q-pa-lg">
      <div class="text-bold my-font text-h4 q-ma-md q-pb-md">Formulario de Medicos</div>
      <q-form
      @submit="onSubmit"
      class="row q-col-gutter-lg"
      >
        <q-input
          outlined
          rounded
          v-model="form.nome"
          label="Nome do Médico"
          lazy-rules
          class="col-lg-6 col-xs-12"
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
        />
        <q-input
          outlined=""
          rounded
          v-model="form.crm"
          label="CRM"
          mask="###############"
          lazy-rules
          class="col-lg-6 col-xs-12"
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
        />
        <!-- <div class="col-lg-12 col-xs-12">
          <q-editor
          v-model="form.content"
          min-height="5rem"
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"/>
        </div> -->
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
          :to="{ name: 'medico-listar' }"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import UseApi from 'src/composables/UseApi'
import { useRoute, useRouter } from 'vue-router'
import { defineComponent, onMounted, ref } from 'vue'
import medicoService from 'src/services/medicoService'

export default defineComponent({
  name: 'MedicoForm',
  setup () {
    // const { getById } = medicoService() // é realmente usado?
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      nome: '',
      crm: ''
    })

    onMounted(async () => {
      const id = route?.params?.id
      if (id) {
        $q.loading.show()
        medicoService('medicos/listar').getById(id).then((data) => {
          form.value.nome = data.nome
          form.value.crm = data.crm
          console.log(data.nome, data.crm)
          $q.loading.hide()
        })
      }
    })

    // const getMedico = async (id) => {
    //   try {
    //     const response = await getById(id)
    //     form.value = response
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    const onSubmit = async (id) => {
      try {
        if (id) {
          // await update(form.value)
          const { data } = await UseApi('/medicos/editar').update(form.value)
          debugger
          console.log('CONSOLE DO EDITAR', data)
        } else {
          // await post(form.value)
          const data = await UseApi('/medicos/adicionar').post(form.value)
          console.log('CONSOLE DO ADICIONAR', data)
        }
        $q.notify({ message: 'Salvo com sucesso', icon: 'check', color: 'positive' })
        router.push({ name: 'medico-listar' })
      } catch (error) {
        console.error(error)
      }
    }

    return {
      form,
      route,
      onSubmit
    }
  }
})
</script>
