import { createConnection } from 'mariadb'

export const useDbClient = async () => {
  const { mariadb } = useRuntimeConfig()

  const conn = await createConnection({ ...mariadb, connectTimeout: 1000000 })
  // conn.execute('use railway')
  conn.query('use railway;')
  return conn
}
