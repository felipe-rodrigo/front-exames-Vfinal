
<template>
  <div>
    <q-page padding>
      <q-table
        :rows="pacientes"
        :columns="columns"
        row-key="name"
        color="amber"
      >
      <template v-slot:top>
        <div class="largura-total q-pa-md flex items-center">
          <span class="text-bold my-font text-h4">Pacientes</span>
          <q-space/>
          <q-btn rounded icon="fa-solid fa-plus" class="float-right q-py-md" color="primary" label="Novo" :to="{ name: 'paciente-adicionar'}"/>
        </div>
        <div class="largura-total">
          <q-input
          v-model="search"
          outlined
          rounded
          debounce="500"
          placeholder="Pesquisas"
          hint="Faça pesquisas aqui!"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        </div>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn class="q-ma-sm" icon="edit" color="secondary" dense size="md" @click="handleEditPaciente(props.row.id)"/>
          <q-btn class="q-ma-auto" icon="delete" color="negative" dense size="md" @click="deletePaciente(props)"/>
        </q-td>
      </template>
    </q-table>
  </q-page>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
// import pacienteService from 'src/services/pacienteService'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
// import { api } from '../boot/axios'
import UseApi from 'src/composables/UseApi'

export default defineComponent({
  name: 'PacientePage',
  setup () {
    const pacientes = ref([])
    // const { remove } = pacienteService()
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
      try {
        const data = await UseApi('/pacientes/listar').list()
        pacientes.value = data
        console.log(pacientes.value)
      } catch (error) {
        console.error(error)
      }
    }

    const deletePaciente = async (props) => {
      try {
        $q.dialog({
          dark: true,
          title: 'Deletar',
          message: 'Certeza que deseja remover?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          // console.log('ID PACIENTES: ', id)
          // await remove(id)
          const { data } = await UseApi('pacientes/deletar').remove(props.row.idPaciente)
          $q.notify({ message: 'Deletado com sucesso', icon: 'check', color: 'positive' })
          await getPacientes()
          return data
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
      deletePaciente,
      handleEditPaciente
    }
  }
})
</script>
