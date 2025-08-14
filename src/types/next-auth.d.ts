import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      phoneNumber?: string;
    } & DefaultSession["user"];
  }

  interface User {
    phoneNumber?: string;
  }

  interface Profile {
    phone_number?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    phoneNumber?: string;
  }
}
