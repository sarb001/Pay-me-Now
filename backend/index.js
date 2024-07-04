import express from 'express';
import user from './Routes/userRoute.js';
import  account from './Routes/AccountRoute.js';
import db from './Database/db.js';
import dotenv from 'dotenv';
import cors from 'cors' ;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}))

dotenv.config();
db();

app.use(cors({
    credentials :true,
    // origin : ,
}))

app.use('/api/v1' , user);

app.use('/api/v1/account' , account);


const PORT = 3000;

app.listen(PORT , () => {
    console.log(`PORT is running ${PORT}`);
})