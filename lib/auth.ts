import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export function getAdminEmails() {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return raw
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null) {
  if (!email) {
    return false;
  }
  return getAdminEmails().includes(email.toLowerCase());
}

export function isAllowedCollegeEmail(email?: string | null) {
  if (!email) {
    return false;
  }
  const domain = process.env.COLLEGE_EMAIL_DOMAIN?.toLowerCase().trim();
  if (!domain) {
    return false;
  }
  return email.toLowerCase().endsWith(`@${domain}`);
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase();
      return isAllowedCollegeEmail(email) || isAdminEmail(email);
    },
    async jwt({ token, user }) {
      const email = (user?.email ?? token.email)?.toLowerCase();
      token.email = email;
      token.isAdmin = isAdminEmail(email);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.isAdmin = Boolean(token.isAdmin);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
