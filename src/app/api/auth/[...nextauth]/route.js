//import { authOption } from "@/app/(main)/utils/auth";
// import { authOption } from "@/app/(main)/utils/auth";
import { authOption } from "@/app/utils/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOption);

export { handler as GET , handler as POST}; 