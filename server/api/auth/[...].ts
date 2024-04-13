import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'
import { useDbClient } from '~/composables/useDbClient'

export default NuxtAuthHandler({
  secret: process.env.auth_secret,
  providers: [
    // @ts-expect-error need .default here for SRR
    GoogleProvider.default({
      clientId: process.env.google_client_id,
      clientSecret: process.env.google_client_secret
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt ({ token, user, account }) {
      return {
        ...token,
        ...user,
        ...account
      }
    },
      async session ({ session, token }) {
        const id = token.id
        const client = await useDbClient()
        const rows = await client.query('select count() from users where user_id = ?', [id])
        if (rows[0]['count()'] === BigInt(0)) {
          await client.query('insert into users (user_id) values (?)', [id])
        } 
        session.user = {
          ...session.user,
          ...token
        }

      return session
    }
  }
}
)
