import useApi from 'src/composables/UseApi'

export default function medicosService () {
  const { list, getById, post, update, remove } = useApi('medicos')

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
