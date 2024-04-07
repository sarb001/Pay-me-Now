
import Account from "../Schemas/BankSchema.js";

export const balance = async(req,res) => {
    try {   
        const account = await Account.findOne(req.userid);

        return res.status(200).json({
            balance : account.balance,
            message : "Balance Left"
        })

    } catch (error) {
        console.log('error balance =',error);
    }
}