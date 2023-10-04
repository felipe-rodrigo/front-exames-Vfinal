<template>
  <q-page padding>
    <q-card rounded class="q-ma-md q-pa-lg">
      <div class="text-bold my-font text-h4 q-ma-md q-pb-md">Formulario de Pacientes</div>
      <q-form
      @submit="onSubmit"
      class="row q-col-gutter-lg"
      >
      <q-input
          outlined
          rounded
          v-model="form.nome"
          label="Nome do Paciente"
          lazy-rules
          class="col-lg-6 col-xs-12"
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
        />
        <q-input
          outlined
          rounded
          v-model="form.dataNascimentos"
          label="Data de Nascimento"
          mask="##/##/####"
          lazy-rules
          class="col-lg-6 col-xs-12"
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
        />
        <!-- <div>
          <q-input filled v-model="date" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date">
                <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        </div> -->

        <div class="col-lg-12 col-xs-12">
          <q-editor
          v-model="form.endereco"
          label="endereco"
          min-height="5rem"
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"/>
        </div>
        <q-input
          outlined
          rounded
          v-model="form.telefone"
          label="Telefone"
          mask="(##) #### - ####"
          hint="Preencha da seguinte maneira: (99) 99999-9999"
          lazy-rules
          class="col-lg-6 col-xs-12"
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
        />
        <q-input
          outlined
          rounded
          v-model="form.cartaoSus"
          label="Cartão SUS"
          mask=""
          lazy-rules
          class="col-lg-6 col-xs-12"
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
        />
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
          :to="{ name: 'paciente-listar' }"
          />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import UseApi from 'src/composables/UseApi'
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import pacienteService from 'src/services/pacienteService'

export default defineComponent({
  name: 'PacienteForm',
  setup () {
    // const { post, getById, update } = pacienteService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      nome: '',
      dataNascimento: '',
      endereco: '',
      telefone: '',
      cartaoSus: ''
    })

    onMounted(async () => {
      // if (route.params.id) {
      //   getPaciente(route.params.id)
      // }
      const id = route?.params?.id
      if (id) {
        $q.loading.show()
        pacienteService('pacientes/listar').getById(id).then((data) => {
          form.value.nome = data.nome
          form.value.dataNascimento = data.dataNascimento
          form.value.endereco = data.endereco
          form.value.telefone = data.telefone
          form.value.cartaoSus = data.cartaoSus
          $q.loading.hide()
        })
      }
    })

    // const getPaciente = async (id) => {
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
      //   router.push({ name: 'paciente-listar' })
      // } catch (error) {
      //   console.error(error)
      // }
      try {
        if (id) {
          // await update(form.value)
          const { data } = await UseApi('/pacientes/editar').update(form.value)
          debugger
          console.log('CONSOLE DO EDITAR', data)
        } else {
          // await post(form.value)
          const data = await UseApi('/pacientes/adicionar').post(form.value)
          console.log('CONSOLE DO ADICIONAR', data)
        }
        $q.notify({ message: 'Salvo com sucesso', icon: 'check', color: 'positive' })
        router.push({ name: 'paciente-listar' })
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
