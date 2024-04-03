// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: [
    '@pinia/nuxt',
    'nuxt-rating',
    '@nuxtjs/eslint-module',
    '@nuxt/image',
    '@nuxt/ui',
    '@sidebase/nuxt-auth'
  ],
  pinia: {
    storesDirs: ['./data/**']
  },
  auth: {
    isEnabled: true,
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: true
    }
  },
  eslint: {
    fix: true
  },
  runtimeConfig: {
    mariadb: {
      host: process.env.db_host ?? (() => { throw new Error('db_host is undefined') })(),
      user: process.env.db_user ?? (() => { throw new Error('db_user is undefined') })(),
      password: process.env.db_pwd ?? (() => { throw new Error('db_pwd is undefined') })(),
      port: 14317
    }
  }
})
