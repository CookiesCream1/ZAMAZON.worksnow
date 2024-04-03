export default defineNuxtRouteMiddleware(async () => {
  const role = await $fetch('/api/user/role')
  if (role === 'admin') {
    return
  }
  return abortNavigation('Not authorized')
})
