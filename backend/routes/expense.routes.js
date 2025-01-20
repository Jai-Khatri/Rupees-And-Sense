import express from 'express';
import { createExpense, deleteExpense } from '../controllers/expense.controller.js';

const router = express.Router();

router.post("/createExpense/:id" , createExpense)
router.delete("/deleteExpense/:id/:expenseId" , deleteExpense)

export default router;