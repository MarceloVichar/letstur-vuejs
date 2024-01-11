const authService = {
  login: async (data) => {
    return await useApiFetch().post('/api/login', data)

  },

  logout: async () => {
    return await useApiFetch().post('/api/logout')
  },
}

export default authService
