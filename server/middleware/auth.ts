import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api/user') && !event.path.startsWith('api/admin')) {
    return
  }
  const session = await getServerSession(event)
  if (!session) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
  }
})
