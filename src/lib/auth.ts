import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (user.email === process.env.OWNER_EMAIL) {
        return true
      }
      return false
    },
  },
  pages: {
    signIn: '/justin.upload',
    error: '/justin.upload',
  }
})
