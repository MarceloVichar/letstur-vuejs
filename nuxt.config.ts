// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: {enabled: true},
  css: [
    '~/assets/css/main.css',
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE,
    },
  },

  vite: {
    server: {
      proxy: {
        '/api': {
          target: `${process.env.NUXT_PUBLIC_API_BASE}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/'),
        },
      },
    },
  },

  // nitro: {
  //   devProxy: {
  //     '/api': {
  //       target: `${process.env.NUXT_PUBLIC_API_BASE}/api`,
  //       changeOrigin: true,
  //     },
  //   },
  // },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'nuxt-lodash',
    'dayjs-nuxt',
    'nuxt-icon',
    '@nuxtjs/color-mode',
  ],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: '~/tailwind.config.js',
  },
  colorMode: {
    preference: 'lightTheme',
    dataValue: 'theme',
    classSuffix: '',
  },
  lodash: {
    prefix: '_',
    prefixSkip: ['string'],
    upperAfterPrefix: false,
  },
  dayjs: {
    locales: ['pt-br'],
    defaultLocale: 'pt-br',
    plugins: ['relativeTime'],
  },
})
