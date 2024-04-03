import { useDbClient } from '~/composables/useDbClient'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  // @ts-expect-error
  const uid = session?.user?.id
  if (uid === undefined) {
    setResponseStatus(event, 400)
    return
  }
  const client = await useDbClient()

  const r = await client.query(
    'select ur.role_name from users as u join user_roles as ur on u.user_role = ur.role_id where u.user_id = ?;',
    [uid]
  ) as { role_name: string }[]

  if (r.length !== 1 || r[0].role_name === undefined) {
    setResponseStatus(event, 403)
    return
  }

  return r[0].role_name
})
