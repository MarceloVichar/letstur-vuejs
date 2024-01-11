const adminsService = {
  list: async (params) => {
    return await useApiFetch().get('/api/admin/admins', {params})
  },

  show: async (id, params) => {
    return await useApiFetch().get(`/api/admin/admins/${id}`, {params})
  },

  create: async (data) => {
    return (data.formObject)
      ? await data.post('/api/admin/admins')
      : await useApiFetch().post('/api/admin/admins', data)
  },

  update: async (id, data) => {
    return (data.formObject)
      ? await data.put(`/api/admin/admins/${id}`)
      : await useApiFetch().put(`/api/admin/admins/${id}`, data)
  },

  delete: async (id) => {
    return await useApiFetch().delete(`/api/admin/admins/${id}`)
  },
}

export default adminsService
