import { Router } from "express";
import * as CC from "./customer.controller.js";

const router = Router();

router.post("/signup", CC.signup);
router.get("/signin",CC.signin)
router.get("/:id",CC.getCustomer)
router.get("/",CC.getAllCustomers)
router.put("/update/:id",CC.updateCustomer)
router.delete("/delete/:id",CC.deleteCustomer)

export default router;