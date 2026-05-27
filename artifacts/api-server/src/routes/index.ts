import { Router, type IRouter } from "express";
import healthRouter from "./health";
import hospedesRouter from "./hospedes";
import authRouter from "./auth";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/hospedes", hospedesRouter);
router.use("/auth", authRouter);

export default router;
