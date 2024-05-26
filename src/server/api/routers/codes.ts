import { connect } from "http2";
import { useSession } from "next-auth/react";
import { z } from "zod";
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
    }),
    getAllCodes:publicProcedure
    .query(({ctx})=>{
        return ctx.db.code.findMany({
            where:{
                id:{
                    not:0
                }
            }
        })
    }),
    redeem: protectedProcedure
    .input(z.number())
    .query(({input,ctx})=>{
        const {data:session} = useSession();
        const userId = session?.user.id;
        return ctx.db.code.update({
            where:{
                id:input
            },
            data:{
                owner:{
                    connect:{
                        id:userId
                    }
                }
            }
        })
    })

});