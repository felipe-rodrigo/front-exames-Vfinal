import useApi from 'src/composables/UseApi'

export default function medicoService () {
  const { list, getById, post, update, remove } = useApi('medico')

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
