import { ObjectId } from "mongodb";
import db from "../../../db/connectionDB.js";

//signup
export const signup = async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  const exist = await db.collection("customers").findOne({ email });
  if (exist) {
    return res.status(400).json({ msg: "email already exist" });
  }
  const data = await db
    .collection("customers")
    .insertOne({ name, email, phone, password });
  return res.status(200).json({ msg: "done", data });
};

//signin
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const exist = await db.collection("customers").findOne({ email });

  if (exist.password !== password || !exist) {
    return res.status(400).json({ msg: "wrong password or email!" });
  }
  return res.status(200).json({ msg: "customer signed in successfully" });
};

//get Specific Customer
export const getCustomer = async (req, res, next) => {
  const { id } = req.params;
  const customer = await db
    .collection("customers")
    .findOne({ _id: new ObjectId(id) });
  if (!customer) {
    return res.status(400).json({ msg: "customer not found" });
  }
  return res.status(200).json({ msg: "done", customer });
};

//all customers
export const getAllCustomers = async (req, res, next) => {
  const customers = await db.collection("customers").find().toArray();
  return res.status(200).json({ msg: "done", customers });
};

//update customer

export const updateCustomer = async (req, res, next) => {
  const { id } = req.params;
  const { name, phone, password } = req.body;

  const data = await db
    .collection("customers")
    .updateOne({ _id: new ObjectId(id) }, { $set: { name, phone, password } });
  data.modifiedCount
    ? res.status(200).json({ msg: "done" })
    : res.status(200).json({ msg: "fail to update!" });
};

//delete customer
export const deleteCustomer = async (req, res, next) => {
  const { id } = req.params;

  const data = await db.collection("customers").deleteOne({ _id: new ObjectId(id) });
   data.deletedCount
     ? res.status(200).json({ msg: "done", data })
     : res.status(200).json({ msg: "fail to delete!"});
};
