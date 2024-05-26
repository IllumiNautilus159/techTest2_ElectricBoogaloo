import NextAuth from "next-auth";
import { NextRouter } from "next/router";

import { authOptions } from "~/server/api/auth";


const handler : NextRouter = NextAuth(authOptions);
export { handler as GET, handler as POST };
export default handler;
