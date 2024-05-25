import { db } from "~/server/db";
import { Prisma, PrismaClient } from "@prisma/client";
type ScratchCode = {
    value:string,
    redeemed :boolean 
}


async function myPreciousSeed(){

    const makeCodes : ScratchCode[] = async()=>{

        const code = await db.code.getFirst();
        return code;
    }

}

myPreciousSeed()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })