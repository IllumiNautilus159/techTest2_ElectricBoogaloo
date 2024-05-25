import { db } from "~/server/db";
import {ScratchCode} from "~/types/ScratchCode";

// seed will add one fresh code to the db :)

async function myPreciousSeed() : Promise<ScratchCode | Error>{
  const code : ScratchCode | null = await db.code.findFirst();
  if(code){
    return code;
  }else{
    return Error("Failed to make code!");
  }
}

export default myPreciousSeed()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })