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
      <span class="text-h4">Médicos</span>
      <q-space/>
      <q-btn color="primary" label="Novo" :to="{ name: 'medico-adicionar'}"/>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn class="q-ma-sm" icon="edit" color="pink-7" dense size="md" @click="handleEditMedico(props.row.id)"/>
        <q-btn class="q-ma-auto" icon="delete" color="negative" dense size="md" @click="deletarMedico(idMedico)"/>
      </q-td>
    </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import medicoService from 'src/services/medicoService'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
// import UseApi from 'src/composables/UseApi'

export default defineComponent({
  name: 'MedicoPage',
  setup () {
    const medicos = ref([])
    const { list, remove } = medicoService()
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
        const data = await list()
        debugger
        medicos.value = data
      } catch (error) {
        console.error(error)
      }
      // try {
      //   const data = await UseApi('/medicos/listar').list()
      //   medicos.value = data
      //   console.log(data)
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

    const handleDeleteMedico = async (id) => {
      try {
        $q.dialog({
          dark: true,
          title: 'Deletar',
          message: 'Certeza que deseja remover?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)
          $q.notify({ message: 'Deletado com sucesso', icon: 'check', color: 'positive' })
          await getMedicos()
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao Apagar', icon: 'times', color: 'negative' })
      }
    }

    const handleEditMedico = (id) => {
      router.push({ name: 'medico-adicionar', params: { id } })
    }

    return {
      medicos,
      columns,
      handleDeleteMedico,
      handleEditMedico
    }
  }
})
</script>
