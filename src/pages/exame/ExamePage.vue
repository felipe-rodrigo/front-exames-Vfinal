<template>
  <q-page padding>
    <q-table :rows="exames" :columns="columns" row-key="name" color="amber">
      <template v-slot:top>
        <div class="largura-total q-pa-md flex items-center">
          <span class="text-bold my-font text-h4">Exames</span>
          <q-space />
          <q-btn
            rounded
            icon="fa-solid fa-plus"
            class="float-right q-py-md"
            color="primary"
            label="Novo"
            :to="{ name: 'exame-adicionar' }"
          />
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
          <q-btn
            class="q-ma-sm"
            icon="edit"
            color="secondary"
            dense
            size="md"
            @click="handleEditExame(props.row.idExame)"
          />
          <q-btn
            class="q-ma-auto"
            icon="delete"
            color="negative"
            dense
            size="md"
            @click="deleteExame(props)"
          />
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
import { defineComponent, ref, onMounted } from "vue";
// TODO: modificar as informações para exames
// import exameService from 'src/services/exameService'
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
// import { api } from 'src/boot/axios'
import UseApi from "src/composables/UseApi";

export default defineComponent({
  name: "ExamePage",
  setup() {
    const exames = ref([]);
    // const { remove } = exameService()

    const FormatDate = (data) => {
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0"); // O mês começa em 0 (janeiro é 0)
      const ano = data.getFullYear();

      return `${dia}/${mes}/${ano}`;
    };

    const columns = [
      // { name: 'nomeExame', field: 'nomeExame', label: 'Nome do Exame', sortable: true, align: 'left' },
      {
        name: "medico",
        field: "medico",
        label: "Médico Responsável",
        sortable: true,
        align: "left",
      },
      {
        name: "paciente",
        field: "paciente",
        label: "Paciente",
        sortable: true,
        align: "left",
      },
      {
        name: "dataHoraExame",
        field: "dataHoraExame",
        format: (val) => FormatDate(new Date(val)),
        label: "Data do Exame",
        sortable: true,
        align: "left",
      },
      {
        name: "observacao",
        field: "observacao",
        label: "Médico Responsável",
        sortable: true,
        align: "left",
      },
      {
        name: "resultado",
        field: "resultado",
        label: "Médico Responsável",
        sortable: true,
        align: "left",
      },
      {
        name: "actions",
        field: "actions",
        label: "Ações",
        sortable: true,
        align: "right",
      },
    ];
    const $q = useQuasar();
    const router = useRouter();

    onMounted(() => {
      getExames();
    });

    // CARREGA A LISTA DE MÉDICOS QUANDO A PÁGINA É INICIALIZADA
    const getExames = async () => {
      try {
        const data = await UseApi("/exames/listar").list();
        exames.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    const deleteExame = async (props) => {
      try {
        $q.dialog({
          dark: true,
          title: "Deletar",
          message: "Certeza que deseja remover?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          // await remove(id)
          const { data } = await UseApi("exames/deletar").remove(
            props.row.idExame
          );
          $q.notify({
            message: "Deletado com sucesso",
            icon: "check",
            color: "positive",
          });
          await getExames();
          return data;
        });
      } catch (error) {
        $q.notify({
          message: "Erro ao Apagar",
          icon: "times",
          color: "negative",
        });
      }
    };

    const handleEditExame = (id) => {
      router.push({ name: "exame-editar", params: { id } });
    };

    return {
      exames,
      columns,
      deleteExame,
      handleEditExame,
    };
  },
});
</script>
