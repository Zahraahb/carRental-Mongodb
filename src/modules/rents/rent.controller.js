import { ObjectId } from "mongodb";
import db from "../../../db/connectionDB.js";

//add rent
export const addRent = async (req, res, next) => {
  const { customerId, carId, rentDate, returnDate } = req.body;
  const customerExist = await db
    .collection("customers")
    .findOne({ _id: new ObjectId(customerId) });
  if (!customerExist) {
    return res.status(400).json({ msg: "customer not found" });
  }
  const carExist = await db
    .collection("cars")
    .findOne({ _id: new ObjectId(carId) });
  if (!carExist) {
    return res.status(400).json({ msg: "car not found" });
  }
  if(carExist.status=="rented"){
    return res.status(400).json({ msg: "car is already rented!" });
  }
  if (new Date(returnDate) < new Date(rentDate)) {
    return res.status(400).json({ msg: "return date must be after rent date" });
  }
  await db.collection("rents").insertOne({
    carId: new ObjectId(carId),
    customerId: new ObjectId(customerId),
    rentDate,
    returnDate,
  });
  await db
    .collection("cars")
    .updateOne({ _id: new ObjectId(carId) }, { $set: { status: "rented" } });
  return res.status(200).json({ msg: "car has been rented successfully" });
};

//update rent
export const updateRent = async (req, res, next) => {
  const { id } = req.params;
  const { rentDate, returnDate } = req.body;
  if (new Date(returnDate) < new Date(rentDate)) {
    return res.status(400).json({ msg: "return date must be after rent date" });
  }
  const data = await db
    .collection("rents")
    .updateOne({ _id: new ObjectId(id) }, { $set: { rentDate, returnDate } });
    data.modifiedCount? res.status(200).json({ msg: "done"}):res.status(400).json({msg:"failed to update!"})
};

//delete rent
export const deleteRent = async (req, res, next) => {
  const { id } = req.params;
  const data = await db.collection("rents").findOneAndDelete({ _id: new ObjectId(id) });
  if(!data){
    return res.status(400).json({ msg: "failed to delete!" });
  }
 await db.collection("cars").updateOne({_id: new ObjectId(data.carId)},{$set: {status:"available"}})
 return res.status(200).json({ msg: "done" });
};

//get all rents
export const getAllRents = async (req, res, next) => {
  const rents = await db.collection("rents").find().toArray();
  return res.status(200).json({ msg: "done", rents });
};

//get specific rent
export const getRent = async (req, res, next) => {
  const { id } = req.params;
  const rent = await db.collection("rents").findOne({ _id: new ObjectId(id) });
  if (!rent) {
    return res.status(400).json({ msg: "rent not found" });
  }
  return res.status(200).json({ msg: "done", rent });
};