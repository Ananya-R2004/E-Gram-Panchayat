import express from "express";
import {
  getVillages,
  addVillage,
  updateVillage,
  deleteVillage,
} from "../controllers/villageController.js";

const router = express.Router();

router.get("/", getVillages);
router.post("/", addVillage);
router.put("/:id", updateVillage);
router.delete("/:id", deleteVillage);

export default router;
