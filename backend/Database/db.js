import mongoose from "mongoose";

const db = async() => {
    const maindb = await mongoose.connect( process.env.MONGO_URL, {
        dbName : process.env.DB_NAME
    }).then((conn) => console.log(`Datasbase Connected `)).catch((err) => console.log('err =',err))
    return maindb;
}

export default db;