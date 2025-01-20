import express from 'express';
import { createIncome, deleteIncome } from '../controllers/income.controller.js';

const router = express.Router();

router.post("/createIncome/:id" , createIncome)
router.delete("/deleteIncome/:id/:incomeId" , deleteIncome)

export default router;