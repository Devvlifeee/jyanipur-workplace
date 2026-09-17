import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/prisma/db";

const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email || !user.email.endsWith("@jyanipur.com")) {
        return false; // Deny entry to any non-workspace email
      }

      // Sync or create user record in Neon database
      const existingUser = await db.workspaceEmail.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        await db.workspaceEmail.create({
          data: {
            email: user.email,
            password: "SSO_MANAGED_GOOGLE",
          },
        }).catch(() => {});
      }

      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export const { GET, POST } = handlers;
export { auth, signIn, signOut };