<template>
  <div>
    <!-- <q-table
      title="Treats"
      :rows="posts"
      :columns="columns"
      row-key="name"
      class="text-black"
    >
    <template v-slot:top>
      <span class="text-h4">Artigos</span>
      <q-space/>
      <q-btn color="primary" label="Novo" :to="{ name: 'formPost'}"/>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn class="q-ma-sm" icon="edit" color="pink-7" dense size="md" @click="handleEditPost(props.row.id)"/>
        <q-btn class="q-ma-auto" icon="delete" color="negative" dense size="md" @click="handleDeletePost(props.row.id)"/>
      </q-td>
    </template>
    </q-table> -->
    <h2 class="my-font" style="font-weight: 400;">
      Dashboard
    </h2>
    <span class="">Relação de exames realizados por periodo</span>
    <q-card></q-card>
  <DashBoard></DashBoard>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import exameService from 'src/services/exameService'
// import { useQuasar } from 'quasar'
// import { useRouter } from 'vue-router'
import DashBoard from 'src/dashboard/DashBoard.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    DashBoard
  },
  setup () {
    const posts = ref([])
    const { list } = exameService()
    // const columns = [
    //   { name: 'id', field: 'id', label: 'Id', sortable: true, align: 'left' },
    //   { name: 'title', field: 'title', label: 'Título', sortable: true, align: 'left' },
    //   { name: 'author', field: 'author', label: 'Autor', sortable: true, align: 'left' },
    //   { name: 'actions', field: 'actions', label: 'Ações', sortable: true, align: 'right' }
    // ]
    // const $q = useQuasar()
    // const router = useRouter()

    onMounted(() => {
      getExames()
    })

    const getExames = async () => {
      try {
        const data = await list()
        posts.value = data
      } catch (error) {
        console.error(error)
      }
    }

    // const handleDeletePost = async (id) => {
    //   try {
    //     $q.dialog({
    //       dark: true,
    //       title: 'Deletar',
    //       message: 'Certeza que deseja remover?',
    //       cancel: true,
    //       persistent: true
    //     }).onOk(async () => {
    //       await remove(id)
    //       $q.notify({ message: 'Deletado com sucesso', icon: 'check', color: 'positive' })
    //       await getPosts()
    //     })
    //   } catch (error) {
    //     $q.notify({ message: 'Erro ao Apagar', icon: 'times', color: 'negative' })
    //   }
    // }

    // const handleEditPost = (id) => {
    //   router.push({ name: 'formPost', params: { id } })
    // }

    return {
      posts,
      // columns,
      // handleDeletePost,
      // handleEditPost,
      DashBoard
    }
  }
})
</script>
