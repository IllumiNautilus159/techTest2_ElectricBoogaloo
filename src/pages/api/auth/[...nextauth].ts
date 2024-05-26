import NextAuth from "next-auth";

import { authOptions } from "~/server/api/auth";


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export default handler;
