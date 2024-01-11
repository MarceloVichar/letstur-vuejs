const twoFactorAuthService = {
  getQRCode: async () => {
    return await useApiFetch().get('/api/user/two-factor-authentication/qr-code')
  },

  recoveryCodes: async () => {
    return await useApiFetch().get('/api/user/two-factor-authentication/recovery-codes')
  },

  verifyCode: async (data) => {
    return await useApiFetch().post('/api/user/two-factor-authentication/confirm', data)
  },

  enableTwoFactor: async (data) => {
    return await useApiFetch().post('/api/user/two-factor-authentication/enable', data)
  },

  disableTwoFactor: async () => {
    return await useApiFetch().delete('/api/user/two-factor-authentication/disable', data)
  },
}

export default twoFactorAuthService
