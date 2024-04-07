
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