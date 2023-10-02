import useApi from 'src/composables/UseApi'

export default function exameService () {
  const { list, getById, post, update, remove } = useApi('exames')

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
