import { Router } from "express";
import * as CC from "./car.conntroller.js";

const router = Router();

router.post("/addCar",CC.addCar)
router.get("/", CC.getAllCars)
router.get("/car/:id", CC.getCar);
router.put("/update/:id",CC.updateCar)
router.delete("/delete/:id",CC.deleteCar)
router.get("/carsWithName",CC.getCarByName)
router.get("/availableCarsWithName",CC.getAvailableCarsByName)
router.get("/rentedCarsOrWithName",CC.getRentedCarsOrWithName)
router.get("/carsWithNamesAndStatus", CC.carsWithNamesAndStatus);
export default router;
