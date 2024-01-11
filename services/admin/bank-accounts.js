const bankAccountsServices = {
  list: async (params) => {
    return await useApiFetch().get('/api/admin/bank-accounts', {params})
  },

  show: async (id, params) => {
    return await useApiFetch().get(`/api/admin/bank-accounts/${id}`, {params})
  },

  create: async (data) => {
    return (data.formObject)
      ? await data.post('/api/admin/bank-accounts')
      : await useApiFetch().post('/api/admin/bank-accounts', data)
  },

  update: async (id, data) => {
    return (data.formObject)
      ? await data.put(`/api/admin/bank-accounts/${id}`)
      : await useApiFetch().put(`/api/admin/bank-accounts/${id}`, data)
  },

  delete: async (id) => {
    return await useApiFetch().delete(`/api/admin/bank-accounts/${id}`)
  },
}

export default bankAccountsServices
