import { z } from "zod";
import { ScratchCode } from "~/types/ScratchCode";
import {createTRPCRouter,protectedProcedure,publicProcedure} from "~/server/api/trpc";

export const codeRouter = createTRPCRouter({
    getCode:publicProcedure
    .input(z.number())
    .query(async({ctx,input})=>{
        return await ctx.db.code.findFirst({
            where:{
                id:input
            }
        })
    }),
    // generateCode:publicProcedure
    //     .input(z.string())
    //     .mutation(async({ctx,input})=>{
    //         return ctx.db.code.create({
    //             data: {
    //                 value: input,
    //             },
    //         });
    // }),

});