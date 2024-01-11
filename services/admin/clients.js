const clientsService = {
  list: async (params) => {
    return await useApiFetch().get('/api/admin/clients', {params})
  },

  show: async (id, params) => {
    return await useApiFetch().get(`/api/admin/clients/${id}`, {params})
  },

  create: async (data) => {
    return (data.formObject)
      ? await data.post('/api/admin/clients')
      : await useApiFetch().post('/api/admin/clients', data)
  },

  update: async (id, data) => {
    return (data.formObject)
      ? await data.put(`/api/admin/clients/${id}`)
      : await useApiFetch().put(`/api/admin/clients/${id}`, data)
  },

  delete: async (id) => {
    return await useApiFetch().delete(`/api/admin/clients/${id}`)
  },

  listCompanies: async (id, params) => {
    return await useApiFetch().get(`/api/admin/clients/${id}/companies`, {params})
  },

  linkCompany: async (clientId, companyId) => {
    return await useApiFetch().post(`/api/admin/clients/${clientId}/companies/${companyId}`)
  },

  unlinkCompany: async (clientId, companyId) => {
    return await useApiFetch().delete(`/api/admin/clients/${clientId}/companies/${companyId}`)
  },
}

export default clientsService
