<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="pacientes"
      :columns="columns"
      row-key="name"
      color="amber"
    >
    <template v-slot:top>
      <span class="text-h4">Pacientes</span>
      <q-space/>
      <q-btn color="primary" label="Novo" :to="{ name: 'paciente-adicionar'}"/>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn class="q-ma-sm" icon="edit" color="pink-7" dense size="md" @click="handleEditPaciente(props.row.id)"/>
        <q-btn class="q-ma-auto" icon="delete" color="negative" dense size="md" @click="handleDeletePaciente(props.row.id)"/>
      </q-td>
    </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import pacienteService from 'src/services/pacienteService'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
// import { api } from '../boot/axios'
import UseApi from 'src/composables/UseApi'

export default defineComponent({
  name: 'PacientePage',
  setup () {
    const pacientes = ref([])
    const { remove } = pacienteService()
    const columns = [
      { name: 'id', field: 'idPaciente', label: 'Id', sortable: true, align: 'left' },
      { name: 'nome', field: 'nome', label: 'Nome', sortable: true, align: 'left' },
      { name: 'dataNascimento', field: 'dataNascimento', label: 'Data do Exame', sortable: true, align: 'left' },
      { name: 'endereco', field: 'endereco', label: 'Endereço', sortable: true, align: 'left' },
      { name: 'telefone', field: 'telefone', label: 'Telefone', sortable: true, align: 'left' },
      { name: 'cartaoSus', field: 'cartaoSus', label: 'Cartão SUS', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', sortable: true, align: 'right' }
    ]
    const $q = useQuasar()
    const router = useRouter()

    onMounted(() => {
      getPacientes()
    })

    // CARREGA A LISTA DE MÉDICOS QUANDO A PÁGINA É INICIALIZADA
    const getPacientes = async () => {
      // try {
      //   const data = await list()
      //   pacientes.value = data
      // } catch (error) {
      //   console.error(error)
      // }
      // try {
      //   const response = await api.get('localhost:3000/pacientess')
      //   console.log(response)
      // } catch {
      // }
      try {
        const data = await UseApi('/pacientes/listar').list()
        pacientes.value = data
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }

    const handleDeletePaciente = async (id) => {
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
          await getPacientes()
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao Apagar', icon: 'times', color: 'negative' })
      }
    }

    const handleEditPaciente = (id) => {
      router.push({ name: 'paciente-adicionar', params: { id } })
    }

    return {
      pacientes,
      columns,
      handleDeletePaciente,
      handleEditPaciente
    }
  }
})
</script>
src/services/medicoService
