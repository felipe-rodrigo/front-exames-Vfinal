
<template>
  <div>
    <q-page padding>
      <q-table :rows="lista" :columns="columns" row-key="name" color="amber">
        <template v-slot:top>
          <div class="largura-total q-pa-md flex items-center">
            <span class="text-bold my-font text-h4">Pacientes</span>
            <q-space />
            <q-btn
              rounded
              icon="fa-solid fa-plus"
              class="float-right q-py-md"
              color="primary"
              label="Novo"
              :to="{ name: 'paciente-adicionar' }"
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
              @click="handleEditPaciente(props.row.idPaciente)"
            />
            <q-btn
              class="q-ma-auto"
              icon="delete"
              color="negative"
              dense
              size="md"
              @click="deletePaciente(props)"
            />
          </q-td>
        </template>
      </q-table>
    </q-page>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import UseApi from "src/composables/UseApi";

export default defineComponent({
  name: "PacientePage",
  setup() {
    const pacientes = ref([]);

    const FormatDate = (data) => {
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0"); // O mês começa em 0 (janeiro é 0)
      const ano = data.getFullYear();

      return `${dia}/${mes}/${ano}`;
    };

    function formatarNumeroTelefone(numero) {
      const numeroLimpo = numero.replace(/\D/g, "");
      if (numeroLimpo.length !== 11) {
        return numero;
      }

      const ddd = numeroLimpo.substring(0, 2);
      const parte1 = numeroLimpo.substring(2, 7);
      const parte2 = numeroLimpo.substring(7);

      const numeroFormatado = `(${ddd}) ${parte1}-${parte2}`;

      return numeroFormatado;
    }

    const columns = [
      {
        name: "id",
        field: "idPaciente",
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
        name: "dataNascimento",
        field: "dataNascimento",
        format: (val) => FormatDate(new Date(val)),
        label: "Data Nascimento",
        sortable: true,
        align: "left",
      },
      {
        name: "endereco",
        field: "endereco",
        label: "Endereço",
        sortable: true,
        align: "left",
      },
      {
        name: "telefone",
        field: "telefone",
        format: (val) => formatarNumeroTelefone(val),
        label: "Telefone",
        sortable: true,
        align: "left",
      },
      {
        name: "cartaoSus",
        field: "cartaoSus",
        label: "Cartão SUS",
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
      getPacientes();
    });

    // CARREGA A LISTA DE MÉDICOS QUANDO A PÁGINA É INICIALIZADA
    const getPacientes = async () => {
      try {
        const data = await UseApi("/pacientes/listar").list();
        pacientes.value = data;
        console.log(pacientes.value);
      } catch (error) {
        console.error(error);
      }
    };

    const deletePaciente = async (props) => {
      try {
        $q.dialog({
          dark: true,
          title: "Remover",
          message: "Certeza que deseja remover?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          // console.log('ID PACIENTES: ', id)
          // await remove(id)
          const { data } = await UseApi("pacientes/deletar").remove(
            props.row.idPaciente
          );
          $q.notify({
            message: "Removido com sucesso",
            icon: "check",
            color: "positive",
          });
          await getPacientes();
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

    const handleEditPaciente = (id) => {
      router.push({ name: "paciente-editar", params: { id } });
    };

    const search = ref("");

    return {
      search,
      lista: computed(() =>
        pacientes.value.filter(
          (x) =>
            x.nome?.toLowerCase().includes(search.value?.toLowerCase()) ||
            FormatDate(new Date(x.dataNascimento))
              .toString()
              .includes(search.value?.toLowerCase()) ||
            x.endereco?.includes(search.value?.toLowerCase()) ||
            x.telefone?.includes(search.value?.toLowerCase()) ||
            x.cartaoSus?.includes(search.value?.toLowerCase())
        )
      ),
      columns,
      deletePaciente,
      handleEditPaciente,
    };
  },
});
</script>
