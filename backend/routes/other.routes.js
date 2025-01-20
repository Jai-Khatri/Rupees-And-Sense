import express from "express";
import {
    getMaxIncomeAndExpense,
    getNetIncome,
    getTotalIncomeAndExpenses,
    getUserIncomes,
    getUserExpenses
} from "../controllers/other.controller.js";

const router = express.Router();

router.get("/maxIncomeAndExpense/:id", getMaxIncomeAndExpense);
router.get("/totalIncomeAndExpense/:id", getTotalIncomeAndExpenses);
router.get("/getNetIncome/:id", getNetIncome);
router.get("/income/:id", getUserIncomes); 
router.get("/expenses/:id", getUserExpenses); 

export default router;
