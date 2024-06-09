import { Router } from "express";
import * as RC from "./rent.controller.js";

const router = Router();
router.post("/addRent",RC.addRent)
router.get("/",RC.getAllRents)
router.get("/:id",RC.getRent)
router.put("/update/:id",RC.updateRent)
router.delete("/delete/:id",RC.deleteRent)

export default router;
