import mongoose from "mongoose";

const connectDb = async (DATABASE_URL) => {
    const options = {
        useUnifiedTopology: 'true',
        dbName: 'schooldb',
    }
    return await mongoose.connect(DATABASE_URL, options).then(() => {
        console.log("DataBase connected Successfully...");
    })
        .catch((err) => {
            console.log(err);
        })
}
export default connectDb;