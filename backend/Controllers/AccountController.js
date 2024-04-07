
import mongoose from "mongoose";
import Account from "../Schemas/BankSchema.js";
import User from "../Schemas/UserSchemas.js";

export const balance = async(req,res) => {
    try {   

        const account = await Account.findOne({
            userid : req.userid
        });
        console.log('account for bal=',account);

        return res.status(200).json({
            balance : account.balance,
            message : "Balance Left"
        })

    } catch (error) {
        console.log('error balance =',error);
    }
}

export const  transferMoney = async(req,res) => {
    try {
        const session = await mongoose.startSession();

        session.startTransaction();
        const { amount , to } = req.body;

        if(isNaN(amount)){
            return res.status(400).json({
                message : "Not a Number"
            })
        }

        const account  = await Account.findOne({ userid : req.userid }).session(session);
        console.log('sender acccount =',account);

        // checking constriants 
        if(!account ||  account.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                message : " Insufficient Balance "
            })
        }

        console.log('to account =',to);
        const toAccount = await Account.findOne({ userid : to }).session(session);
        console.log('to acccount =',toAccount);

        // check constraints 
        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message : " Invalid Account "
            }) 
        }

        await Account.updateOne({ userid : req.userid } , { $inc : { balance : -amount } }).session(session);
        await Account.updateOne({ userid : to }, { $inc : { balance : amount } }).session(session);
        
        await session.commitTransaction();

        res.status(200).json({
            message : " Transfer Successful "
        })

    } catch (error) {
        console.log('transfer money error =',error);
    }
}