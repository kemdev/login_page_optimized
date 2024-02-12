import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

import Google from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { Adapter } from 'next-auth/adapters';

import clientPromise from '@/lib/mongodb';
import mongoose from 'mongoose';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        const url = req.body?.hostname;

        const urlFixer = () => {
          const dev = process.env.NODE_ENV;
          let prefix = '';
          if (dev == 'development') {
            prefix = 'http://';
          } else {
            prefix = 'https://';
          }

          return prefix + url + '/api/auth/credentials';
        };

        const fullURL = urlFixer();

        const res = await fetch(fullURL, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();

        const user = await data.user;

        console.log('🚀 ~ authorize ~ user:', user);

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     console.log('🚀 ~ signIn ~ user:', user);
  //     return true;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl;
  //   },
  //   jwt: async ({ token, user }) => {
  //     if (user) {
  //       token.email = user.data.auth.email;
  //       token.username = user.data.auth.userName;
  //       token.user_type = user.data.auth.userType;
  //       token.accessToken = user.data.auth.token;
  //     }

  //     return token;
  //   },
  //   session: ({ session, token, user }) => {
  //     console.log("🚀 ~ session:", session)
  //     if (token) {
  //       session.user.email = token.email;
  //       session.user.username = token.userName;
  //       session.user.accessToken = token.accessToken;
  //     }
  //     return session;
  //   },
  // },
};
const handler = NextAuth(authOptions);
export default handler;
