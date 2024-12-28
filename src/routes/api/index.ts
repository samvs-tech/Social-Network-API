import { Router } from "express";
const router = Router();
import thoughtRoutes from "./thoughtRoute.js";
import userRoutes from "./userRoutes.js";

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

export default router;