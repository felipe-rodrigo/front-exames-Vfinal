<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="row q-col-gutter-lg"
    >
    <q-input
        outlined=""
        v-model="form.nome"
        label="Nome do Médico"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
      />
      <q-input
        outlined=""
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
        label="Salvar"
        color="secondary"
        class="float-right"
        icon="save"
        type="submit"
        />
        <q-btn
        label="Cancelar"
        color="white"
        class="float-right"
        text-color="secondary"
        :to="{ name: 'medico-listar' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import UseApi from 'src/composables/UseApi'
import medicoService from 'src/services/medicoService'
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'MedicoForm',
  setup () {
    const { getById } = medicoService()
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
        $q.loading.show();
        medicoService('medicos/listar').getById(id).then((data)=>{
          form.value.nome = data.nome;
          form.value.crm = data.crm;
          $q.loading.hide()
        });
      }
    })

    const getMedico = async (id) => {
      try {
        const response = await getById(id)
        form.value = response
      } catch (error) {
        console.log(error)
      }
    }

    const onSubmit = async (id) => {
      try {
        if (form.value.id) {
          // await update(form.value)
          const { data } = await UseApi('/medicos/editar').update(form.value)
          console.log(data)
        } else {
          // await post(form.value)
          const data = await UseApi('/medicos/adicionar').post(form.value)
          console.log(data)
          debugger
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
