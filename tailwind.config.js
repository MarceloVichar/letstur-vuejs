/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        lightTheme: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#33C8B6',
          secondary: '#33C8B6',
          'accent-content': '#D7DDE4',
        },
        darkTheme: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#33C8B6',
          secondary: '#33C8B6',
          'accent-content': '#2A323C',
        },
      },
    ],
  },
};
