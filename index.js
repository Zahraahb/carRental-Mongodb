import express from "express";
import db from "./db/connectionDB.js";
import customerRouter from "./src/modules/customers/customer.routes.js";
import carRouter from "./src/modules/cars/car.routes.js";
import rentRouter from "./src/modules/rents/rent.routes.js";


const app = express();
const port = 3000;

app.use(express.json());
app.use('/customers',customerRouter)
app.use("/cars",carRouter)
app.use("/rents",rentRouter)



app.get("/", (req, res) => {
  res.json({ message: "Hello on my project!" });
});

app.use("*", (req, res) => res.status(404).json({ msg: "404 page not found" }));
app.listen(port, () => console.log(`server is running on port ${port}!`));

