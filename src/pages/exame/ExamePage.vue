<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="exames"
      :columns="columns"
      row-key="name"
      color="amber"
    >
    <template v-slot:top>
      <span class="text-h4">Exames</span>
      <q-space/>
      <q-btn color="primary" label="Novo" :to="{ name: 'exame-adicionar'}"/>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn class="q-ma-sm" icon="edit" color="secondary" dense size="md" @click="handleEditExame(props.row.id)"/>
        <q-btn class="q-ma-auto" icon="delete" color="negative" dense size="md" @click="handleDeleteExame(props.row.id)"/>
      </q-td>
    </template>
    <template v-slot:body-cell-medico="props">
      <q-td>
        {{ props.row.medico.nome }}
      </q-td>
    </template>
    <template v-slot:body-cell-paciente="props">
      <q-td>
        {{ props.row.paciente.nome }}
      </q-td>
    </template>

    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
// TODO: modificar as informações para exames
import exameService from 'src/services/exameService'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
// import { api } from 'src/boot/axios'
import UseApi from 'src/composables/UseApi'

export default defineComponent({
  name: 'ExamePage',
  setup () {
    const exames = ref([])
    const { remove } = exameService()
    const columns = [
      // { name: 'nomeExame', field: 'nomeExame', label: 'Nome do Exame', sortable: true, align: 'left' },
      { name: 'medico', field: 'medico', label: 'Médico Responsável', sortable: true, align: 'left' },
      { name: 'paciente', field: 'paciente', label: 'Paciente', sortable: true, align: 'left' },
      { name: 'dataHoraExame', field: 'dataHoraExame', label: 'Data do Exame', sortable: true, align: 'left' },
      { name: 'observacao', field: 'observacao', label: 'Médico Responsável', sortable: true, align: 'left' },
      { name: 'resultado', field: 'resultado', label: 'Médico Responsável', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', sortable: true, align: 'right' }
    ]
    const $q = useQuasar()
    const router = useRouter()

    onMounted(() => {
      getExames()
    })

    // CARREGA A LISTA DE MÉDICOS QUANDO A PÁGINA É INICIALIZADA
    const getExames = async () => {
      // try {

      //   const data = await list()
      //   exames.value = data
      // } catch (error) {
      //   console.error(error)
      // }

      try {
        const data = await UseApi('/exames/listar').list()
        exames.value = data
        console.log(data)
      } catch (error) {
        console.error(error)
      }

      // UseApi('/exames/listar').list()
      //   .then((data) => {
      //     if (!data) {
      //       return
      //     }
      //     exames.value = data
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    }

    const handleDeleteExame = async (id) => {
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
          await getExames()
        })
      } catch (error) {
        $q.notify({ message: 'Erro ao Apagar', icon: 'times', color: 'negative' })
      }
    }

    const handleEditExame = (id) => {
      router.push({ name: 'exame-adicionar', params: { id } })
    }

    return {
      exames,
      columns,
      handleDeleteExame,
      handleEditExame
    }
  }
})
</script>
