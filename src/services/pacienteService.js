import useApi from 'src/composables/UseApi'

export default function pacienteService () {
  const { list, getById, post, update, remove } = useApi('pacientes')

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
