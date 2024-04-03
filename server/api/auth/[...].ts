import GoogleProvider from 'next-auth/providers/google'
import { NuxtAuthHandler } from '#auth'

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
    session ({ session, token }) {
      session.user = {
        ...session.user,
        ...token
      }

      return session
    }
  }
})
