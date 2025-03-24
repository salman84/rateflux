import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check if the credentials match your admin user
        if (credentials.email === process.env.ADMIN_EMAIL) {
          // Verify password
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            process.env.ADMIN_PASSWORD_HASH || ''
          );

          if (passwordMatch) {
            return {
              id: '1',
              email: credentials.email,
              name: 'Admin',
              role: 'admin'
            };
          }
        }
        
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin-login',
    error: '/admin-login',
  }
});

export { handler as GET, handler as POST };
