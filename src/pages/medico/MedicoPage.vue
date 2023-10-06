<template>
  <q-page padding class="">
    <q-table :rows="lista" :columns="columns" row-key="name" color="amber">
      <template v-slot:top>
        <div class="largura-total q-pa-md flex items-center">
          <span class="text-bold my-font text-h4">Medicos</span>
          <q-space />
          <q-btn
            rounded
            icon="fa-solid fa-plus"
            class="float-right q-py-md"
            color="primary"
            label="Novo"
            :to="{ name: 'medico-adicionar' }"
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
            @click="handleEditMedico(props.row.idMedico)"
          />
          <q-btn
            class="q-ma-auto"
            icon="delete"
            color="negative"
            dense
            size="md"
            @click="deleteMedico(props)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
// import medicoService from 'src/services/medicoService'
import { useQuasar } from "quasar";
import UseApi from "src/composables/UseApi";
import { useRouter } from "vue-router";
// import { api } from 'src/boot/axios'

export default defineComponent({
  name: "MedicoPage",
  setup() {
    const medicos = ref([]);
    // declarar metodos aqui
    // const { remove } = medicoService()
    const columns = [
      {
        name: "id",
        field: "idMedico",
        label: "Id",
        sortable: true,
        align: "left",
      },
      {
        name: "nome",
        field: "nome",
        label: "Nome",
        sortable: true,
        align: "left",
      },
      {
        name: "crm",
        field: "crm",
        label: "CRM",
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
      getMedicos();
    });

    // CARREGA A LISTA DE MÉDICOS QUANDO A PÁGINA É INICIALIZADA
    const getMedicos = async () => {
      try {
        const data = await UseApi("/medicos/listar").list();
        medicos.value = data;
      } catch (error) {
        console.error(error);
      }
    };

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
          title: "Remover",
          message: "Certeza que deseja remover?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          // await
          const { data } = await UseApi("medicos/deletar").remove(
            props.row.idMedico
          );
          $q.notify({
            message: "Removido com sucesso",
            icon: "check",
            color: "positive",
          });
          await getMedicos();
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

    const handleEditMedico = (id) => {
      router.push({ name: "medico-editar", params: { id } });
    };
    const search = ref("");

    return {
      search,
      lista: computed(() =>
        medicos.value.filter(
          (x) =>
            x.nome?.toLowerCase().includes(search.value?.toLowerCase()) ||
            x.crm?.includes(search.value?.toLowerCase())
        )
      ),
      columns,
      deleteMedico,
      handleEditMedico,
    };
  },
});
</script>
