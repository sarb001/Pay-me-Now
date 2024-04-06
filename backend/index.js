import express from 'express';
import user from './Routes/userRoute.js';

const app = express();

// app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use('/api/v1' , user);

const PORT = 3000;

app.listen(PORT , () => {
    console.log(`PORT is running ${PORT}`);
})