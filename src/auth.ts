import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "demo_google_client_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo_google_client_secret",
    }),
    Credentials({
      name: "Demo Student Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "student@kaust.edu.sa" },
        name: { label: "Name", type: "text", placeholder: "Fahad Al-Saudi" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        return {
          id: "student-101",
          name: (credentials.name as string) || "Fahad Al-Saudi",
          email: credentials.email as string,
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "bausalty_secret_auth_key_2026",
});
