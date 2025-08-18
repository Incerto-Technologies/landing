import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import type { Account, Profile } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/user.phonenumbers.read",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({
      token,
      account,
      profile,
      user,
    }: {
      token: JWT;
      account: Account | null;
      profile?: Profile;
      user?: any;
    }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      console.log("account", account);
      console.log("profile", profile);
      console.log("user", user);
      if (account) {
        token.accessToken = account.access_token;
      }
      // Persist phone number from user object
      if (user?.phoneNumber) {
        token.phoneNumber = user.phoneNumber;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Send properties to the client, like an access_token and user id from a provider
      session.accessToken = token.accessToken;
      if (token.phoneNumber) {
        session.user = {
          ...session.user,
          phoneNumber: token.phoneNumber,
        };
      }
      return session;
    },
    async signIn({
      user,
      account,
      profile,
    }: {
      user: any;
      account: Account | null;
      profile?: Profile;
    }) {
      if (account?.provider === "google" && account.access_token) {
        try {
          // First try to get phone number from profile if available
          if (profile?.phone_number) {
            user.phoneNumber = profile.phone_number;
            console.log("Phone number from profile:", profile.phone_number);
          } else {
            // Try to fetch from Google People API as fallback
            const response = await fetch(
              `https://people.googleapis.com/v1/people/me?personFields=phoneNumbers`,
              {
                headers: {
                  Authorization: `Bearer ${account.access_token}`,
                },
              }
            );

            if (response.ok) {
              const data = await response.json();
              console.log("People API data:", data);
              const phoneNumbers = data.phoneNumbers || [];

              if (phoneNumbers.length > 0) {
                user.phoneNumber = phoneNumbers[0].value;
                console.log(
                  "Phone number from People API:",
                  phoneNumbers[0].value
                );
              }
            } else {
              console.log(
                "People API response not ok:",
                response.status,
                response.statusText
              );
            }
          }
        } catch (error) {
          console.error("Error fetching phone number:", error);
        }
      }
      return true;
    },
  },
  secret: process.env.JWT_SECRET,
};
