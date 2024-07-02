import mongoose from "mongoose";
const connect = process.env.DB_CONNECTION_STRING
mongoose.connect(`mongodb+srv://santanasamuel08:''@cluster0.r29uumt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

let db = mongoose.connection;

export default db;

