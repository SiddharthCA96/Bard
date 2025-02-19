import express from "express";
import {accountCreate} from "../controllers/bankControllers"
export const  bankRouter=express.Router();


//create the bank account route
console.log("inside routes.ts");

bankRouter.post("/create", accountCreate);
//bank to wallet transfer route
bankRouter.post("/wtb",(req,res)=>{
    //
})

//wallet to bank transfer route
bankRouter.post("/btw",(req,res)=>{
    //
})
//route to get all btw and wtb transactions (- Retrieves all bank transactions for the user)
bankRouter.get("/tranactions:userId",(req,res)=>{
    //
})

//route to send a webhook event to bank-webhook
bankRouter.post("/simulate_webhook",(req,res)=>{
    //
})