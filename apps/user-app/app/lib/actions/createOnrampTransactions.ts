"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth";
import { prisma } from "@repo/db/client";


export const createOnrampTransaction = async (amount:number, provider:string) => { 
    const session = await getServerSession(authOptions);

    const token = (Math.random()*1000).toString(); // ideally, this token will come from baning api.

    if(!session?.user || !session.user.id){
        return{ message:"Unauthenticated request"}
    }

    await prisma.onRampTransaction.create({
        data:{
            status:"Processing",
            token,
            provider,
            amount,
            startTime:new Date(),
            userId:Number(session?.user?.id)
        }
    })

    return {
        message:"On ramp trasaction initialized."
    }


}