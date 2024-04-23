
import mongoose from "mongoose";
// import Account from "../Schemas/BankSchema.js";
import User from "../Schemas/UserSchemas.js";

export const balance = async(req,res) => {
    try {   

        const account = await Account.findOne({
            userid : req.userid
        });
        console.log('account  bal backend =',account);

        return res.status(200).json({
            balance : account.balance,
            message : "Balance Left",
            account
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

export const  AllTransaction = async(req,res) => {
    try {
        // money paid to  user will show here


    } catch (error) {
            console.log('all trans error',error);
    }
}

export const RequestMoney = async(req,res) => {
        try {

            // money amount entered = 1000,  loggeduser id 
            
            // user whom to sent ( sender whom requesting )

            // update with schema 

            const loggeduserid = req.userid;
            const requested = req?.body;
            console.log('request =',requested);

            console.log('logged request userid =',loggeduserid);

            res.status(200).json({
                 message: " Money Requested "
            })

        } catch (error) {
            console.log('request money error= ',error);  
        }
}