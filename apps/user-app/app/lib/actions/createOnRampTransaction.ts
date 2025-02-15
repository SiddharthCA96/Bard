"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(amount:number,provider:string){
    //never pass the userid in the function as someone can send others id 
    //always extract the id from next-auth (session)

    const session= await getServerSession(authOptions);

    const userId=session.user.id;

    if(!userId){
        return{
            message:"UnAuthenticated User"
        }
    }
    //this token should come from the bank for a particular req ( but we are just simulating it)
    const token=(Math.random()*1000).toString();

    
    //create the ormt 
    await prisma.onRampTransaction.create({
        data:{
            userId:Number(userId),
            amount:amount,
            status:"Processing",
            startTime:new Date,
            provider:provider,
            token:token,
        }
    })
    console.log("created");
    
    return{
        message:"OnRamp Transaction added"
    }

}