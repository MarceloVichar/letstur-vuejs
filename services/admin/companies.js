const companiesService = {
  list: async (params) => {
    return await useApiFetch().get('/api/admin/companies', {params})
  },

  show: async (id, params) => {
    return await useApiFetch().get(`/api/admin/companies/${id}`, {params})
  },

  create: async (data) => {
    return (data.formObject)
      ? await data.post('/api/admin/companies')
      : await useApiFetch().post('/api/admin/companies', data)
  },

  update: async (id, data) => {
    return (data.formObject)
      ? await data.put(`/api/admin/companies/${id}`)
      : await useApiFetch().put(`/api/admin/companies/${id}`, data)
  },

  delete: async (id) => {
    return await useApiFetch().delete(`/api/admin/companies/${id}`)
  },
}

export default companiesService
