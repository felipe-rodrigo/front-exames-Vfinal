import useApi from 'src/composables/UseApi'

export default function exameService (url) {
  const { list, getById, post, update, remove } = useApi(url)

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
