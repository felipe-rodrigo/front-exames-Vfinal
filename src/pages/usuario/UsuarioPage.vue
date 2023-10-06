<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="usuarios"
      :columns="columns"
      row-key="name"
      color="primary"
    >
      <template v-slot:top>
        <span class="text-h4">Usuários</span>
        <q-space />
        <q-btn
          color="primary"
          label="Novo"
          :to="{ name: 'usuario-adicionar' }"
        />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            class="q-ma-sm"
            icon="edit"
            color="secondary"
            dense
            size="md"
            @click="handleEditUsuario(props.row.id)"
          />
          <q-btn
            class="q-ma-auto"
            icon="delete"
            color="negative"
            dense
            size="md"
            @click="handleDeleteUsuario(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import usuarioService from "src/services/usuarioService";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
// import { api } from '../boot/axios'
// import UseApi from 'src/composables/UseApi'

export default defineComponent({
  name: "UsuarioPage",
  setup() {
    const usuarios = ref([]);
    const { list, remove } = usuarioService();
    const columns = [
      {
        name: "id",
        field: "idUsuario",
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
      getUsuarios();
    });

    // CARREGA A LISTA DE MÉDICOS QUANDO A PÁGINA É INICIALIZADA
    const getUsuarios = async () => {
      try {
        const data = await list();
        usuarios.value = data;
      } catch (error) {
        console.error(error);
      }
      // try {
      //   const response = await api.get('localhost:3000/usuarios')
      //   console.log(response)
      // } catch {
      // }
      // try {
      //   const data = await UseApi('/usuarios/listar').list()
      //   usuarios.value = data
      //   console.log(data)
      // } catch (error) {
      //   console.error(error)
      // }
    };

    const handleDeleteUsuario = async (id) => {
      try {
        $q.dialog({
          dark: true,
          title: "Remover",
          message: "Certeza que deseja remover?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(id);
          $q.notify({
            message: "Removido com sucesso",
            icon: "check",
            color: "positive",
          });
          await getUsuarios();
        });
      } catch (error) {
        $q.notify({
          message: "Erro ao Apagar",
          icon: "times",
          color: "negative",
        });
      }
    };

    const handleEditUsuario = (id) => {
      router.push({ name: "usuario-adicionar", params: { id } });
    };

    return {
      usuarios,
      columns,
      handleDeleteUsuario,
      handleEditUsuario,
    };
  },
});
</script>
