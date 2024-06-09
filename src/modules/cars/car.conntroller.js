import { ObjectId } from "mongodb";
import db from "../../../db/connectionDB.js";

//add car
export const addCar = async (req,res,next)=>{
    const{name, model} = req.body;
    await db.collection("cars").insertOne({name, model ,status:"available"})
    return res.status(200).json({msg:"done"})
}

//get specific car
export const getCar = async (req,res,next)=>{
    const {id} = req.params;
    const car = await db.collection("cars").findOne({_id:new ObjectId(id)})
    if(!car){
        return res.status(400).json({msg:"car not found"})
    }
    return res.status(200).json({msg:"done",car})
}

//get all cars
export const getAllCars = async (req,res,next)=>{
    
    const cars = await db.collection("cars").find().toArray()
    return res.status(200).json({msg:"done",cars})
}

//update car

export const updateCar = async (req,res,next)=>{
    const {id} = req.params;
    const {name,model,status} = req.body
    if(status!=="available" && status!=="rented"){
        return res.status(400).json({msg:"status must be available or rented!"})
    }
    const data= await db.collection("cars").updateOne({_id: new ObjectId(id)},{$set: {name,model,status}})
    data.modifiedCount? res.status(200).json({msg:"done"}): res.status(400).json({msg:"failed to update!"})
    
}

//delete car
export const deleteCar = async (req,res,next)=>{
    const {id} = req.params;
    const data = await db.collection("cars").deleteOne({_id: new ObjectId(id)})
    data.deletedCount? res.status(200).json({msg:"done",data}): res.status(400).json({msg:"failed to delete!"})
    
}

//get car with name
export const getCarByName = async(req,res,next)=>{
    let { name } = req.query
    const data = await db.collection("cars").find({$or:[
        {name: {$in: name.split(",")}},
        {name}
    ]}).toArray()
  
    return res.status(200).json({msg:"done",data})
}


   //get available cars with specific name
   export const getAvailableCarsByName = async(req,res,next)=>{
    let { name } = req.query
    const data = await db.collection("cars").find({$and:[
        {name},
        {status:"available"}
    ]}).toArray()
    return res.status(200).json({msg:"done",data})
}
    
//Get Cars that are Either rented or of a Specific name
export const getRentedCarsOrWithName = async(req,res,next)=>{
    let { name } = req.query
    const data = await db.collection("cars").find({$or:[
        {name},
        {status:"rented"}
    ]}).toArray()
    return res.status(200).json({msg:"done",data})
}
  

export const carsWithNamesAndStatus = async (req, res, next) => {
  let { name, status } = req.query;
  const data = await db
    .collection("cars")
    .find({
      $and: [
        { $or: [{ name: { $in: name.split(",") } }, { name }] },
        { status },
      ],
    })
    .toArray();
  return res.status(200).json({ msg: "done", data });
};