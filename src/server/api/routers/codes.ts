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
    generateCode:publicProcedure
        .input(z.string().optional())
        .query(async({ctx,input})=>{
            return ctx.db.code.create({
                data: {
                    value: input ?? "10",
                    redeemed:false,
                    redeemedAt:new Date()
                },
            });
    }),
    first: publicProcedure
    .query(({ctx})=>{
        return ctx.db.code.findFirst({
            where:{
                id: {
                    not:undefined
                }
            }
        });
    })

});