import { getServerSession } from '#auth'
import { useDbClient } from '~/composables/useDbClient'

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api/admin')) {
    return
  }
  const session = await getServerSession(event)
  if (!session) {
    throw createError({ statusMessage: 'unable to authenticate', statusCode: 400 })
  }
  const db = await useDbClient()

  // @ts-expect-error
  const uid = session.user.id
  const role = await db.query('select role_name from users join user_roles on users.user_role = user_roles.role_id where users.user_id = ?;', [uid]) as { role_name: string }[]

  if (role[0].role_name !== 'admin') {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
  }
})
