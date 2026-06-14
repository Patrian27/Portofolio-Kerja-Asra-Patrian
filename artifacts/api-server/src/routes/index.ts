import { Router, type IRouter } from "express";
import healthRouter from "./health";
import docsRouter from "./docs";
import experiencesRouter from "./experiences";
import certificatesRouter from "./certificates";
import profileRouter from "./profile";
import educationRouter from "./education";

const router: IRouter = Router();

router.use(healthRouter);
router.use(docsRouter);
router.use(experiencesRouter);
router.use(certificatesRouter);
router.use(profileRouter);
router.use(educationRouter);

export default router;
