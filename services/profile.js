const profileService = {
  getProfile: async () => {
    return await useApiFetch().get('/api/profile')
  },

  updateProfile: async (data) => {
    return await useApiFetch().post('/api/profile', data)
  },
}

export default profileService
