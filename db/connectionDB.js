import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017" )

client.connect().then(()=>{
    console.log("connected to mongoDB!")
    
}).catch((err)=>{
    console.log(err)

})
const db = client.db("rentalSystem")
export default db