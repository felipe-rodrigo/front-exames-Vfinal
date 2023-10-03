<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="medicos"
      :columns="columns"
      row-key="name"
      color="amber"
    >
    <template v-slot:top>
      <span class="text-h4">Medicos</span>
      <q-space/>
      <q-btn color="primary" label="Novo" :to="{ name: 'medico-adicionar'}"/>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn class="q-ma-sm" icon="edit" color="secondary" dense size="md" @click="handleEditMedico(props.row.idMedico)"/>
        <q-btn class="q-ma-auto" icon="delete" color="negative" dense size="md" @click="deleteMedico(props)"/>
      </q-td>
    </template>
    </q-table>
    {{ "DATA CAIU AQUI " + data }}
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
// import medicoService from 'src/services/medicoService'
import { useQuasar } from 'quasar'
import UseApi from 'src/composables/UseApi'
import { useRouter } from 'vue-router'
// import { api } from 'src/boot/axios'

export default defineComponent({
  name: 'MedicoPage',
  setup () {
    const medicos = ref([])
    // declarar metodos aqui
    // const { remove } = medicoService()
    const columns = [
      { name: 'id', field: 'idMedico', label: 'Id', sortable: true, align: 'left' },
      { name: 'nome', field: 'nome', label: 'Nome', sortable: true, align: 'left' },
      { name: 'crm', field: 'crm', label: 'CRM', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', sortable: true, align: 'right' }
    ]
    const $q = useQuasar()
    const router = useRouter()

    onMounted(() => {
      getMedicos()
    })

    // CARREGA A LISTA DE MÉDICOS QUANDO A PÁGINA É INICIALIZADA
    const getMedicos = async () => {
      try {
        const data = await UseApi('/medicos/listar').list()
        medicos.value = data
        console.log('CAIU AQUI ', data)
        console.log('TAMANHO DO DATA ', data.length())
      } catch (error) {
        console.error(error)
      }

      // try {
      //   const data = await list()
      //   debugger
      //   medicos.value = data
      // } catch (error) {
      //   console.error(error)
      // }
      // try {
      //   const response = await api.get('localhost:3000/medicos')
      //   console.log(response)
      // } catch {
      // }
    }

    // const deleteMedicos = async () => {
    //   try {
    //     const data = await UseApi('/medicos/deletar').remove()
    //     medicos.value = data
    //     console.log(data)
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }

    // async function deletarMedico (idMedico) {
    //   try {
    //     await UseApi(`/medicos/${idMedico}`).delete()
    //     medicos.value = medicos.value.filter(medico => medico.idMedico !== idMedico)
    //     console.log(`Médico com ID ${idMedico} excluído com sucesso.`)
    //   } catch (error) {
    //     console.error(`Erro ao excluir o médico com ID ${idMedico}:`, error)
    //   }
    // }

    // const updateMedico = async (form) => {
    //   try {
    //     const { data } = await api.put(`${url}/${form}`, form)
    //     return data
    //   } catch (error) {
    //     throw new Error(error)
    //   }
    // }

    const deleteMedico = async (props) => {
      try {
        $q.dialog({
          title: 'Deletar',
          message: 'Certeza que deseja remover?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          // await
          const { data } = await UseApi('medicos/deletar').remove(props.row.idMedico)
          $q.notify({ message: 'Deletado com sucesso', icon: 'check', color: 'positive' })
          await getMedicos()
          return data
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao Apagar', icon: 'times', color: 'negative' })
      }
    }

    const handleEditMedico = (id) => {
      router.push({ name: 'medico-editar', params: { id } })
    }

    return {
      medicos,
      columns,
      deleteMedico,
      handleEditMedico
    }
  }
})
</script>
