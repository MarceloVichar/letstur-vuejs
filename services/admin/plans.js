const plansService = {
  list: async (params) => {
    return await useApiFetch().get('/api/admin/plans', {params})
  },

  show: async (id, params) => {
    return await useApiFetch().get(`/api/admin/plans/${id}`, {params})
  },

  create: async (data) => {
    return (data.formObject)
      ? await data.post('/api/admin/plans')
      : await useApiFetch().post('/api/admin/plans', data)
  },

  update: async (id, data) => {
    return (data.formObject)
      ? await data.put(`/api/admin/plans/${id}`)
      : await useApiFetch().put(`/api/admin/plans/${id}`, data)
  },

  delete: async (id) => {
    return await useApiFetch().delete(`/api/admin/plans/${id}`)
  },
}

export default plansService
