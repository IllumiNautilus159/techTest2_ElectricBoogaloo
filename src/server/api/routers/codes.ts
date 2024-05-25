import { z } from "zod";
import { db } from "~/server/db";
import { ScratchCode } from "~/types/ScratchCode";
import {createTRPCRouter,protectedProcedure,publicProcedure} from "~/server/api/trpc";

export const codeRouter = createTRPCRouter({

    generateCode:publicProcedure
        .input(z.object({value:z.number(), ownerId:z.number().optional()}))
        .mutation(async({input})=>{

        const newCode = await db.code.create({
            data:{
                value:input.value.toString() ?? "100",
                owner:{
                    connect:{
                        id:input.ownerId?.toString() ?? undefined
                    }
                }
            },
        })
    })

});