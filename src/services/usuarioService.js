import useApi from 'src/composables/UseApi'

export default function usuarioService () {
  const { list, getById, post, update, remove } = useApi('usuarios')

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
