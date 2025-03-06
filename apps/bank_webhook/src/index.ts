import express from "express";
import { prisma } from "@repo/db/client";

const app = express();

app.use(express.json())

app.post("/", async (req, res)=>{
    //TODO: Add zod validation here?
    //TODO: add secret here. make sure this req is coming from legit way.
    //TODO: check if this onRampTxn is processig or not. so the same request won't be processed twice.

    const paymentInformation = {
        token : req.body.token, 
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
    
    try{
        await prisma.$transaction([

            prisma.balance.update({
                where:{
                    userId: Number(paymentInformation.userId)
                },
                data:{
                    amount:{
                        increment:Number(paymentInformation.amount)
                    }
                }
            }),

            prisma.onRampTransaction.update({
                where:{
                    token:paymentInformation.token
                },
                data:{
                    status:"Success"
                }
            })
        ]);

        res.status(200).json({
            message:"captured"
        })
        
    }catch(e){
        console.log(e)
        res.status(411).json({
            message:"Error while processing bank_webhook. "
        })
    }
})

app.listen(3003);