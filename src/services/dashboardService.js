import useApi from 'src/composables/UseApi'

export default function dashboardService (url) {
  const { list, getById, post, update, remove } = useApi(url)

  return {
    list,
    post,
    update,
    remove,
    getById
  }
}
