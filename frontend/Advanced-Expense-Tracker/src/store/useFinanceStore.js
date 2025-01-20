import { create } from 'zustand';
import axiosInstance from '../libs/axios.js';

// Creating another Zustand store for managing financial data
const useFinanceStore = create((set) => ({
  incomeList: [], // List of user's incomes
  expenseList: [], // List of user's expenses
  totalIncome: 0, // Total income amount
  totalExpenses: 0, // Total expenses amount
  netIncome: 0, // Net income (total income - total expenses)
  maxIncome: 0, // Maximum income recorded
  maxExpense: 0, // Maximum expense recorded
  isLoading: false, // Loading state for async actions
  error: null, // Error message for failed actions

  // Fetch total income and expenses for a user
  fetchTotalIncomeAndExpenses: async (id) => {
    set({ isLoading: true, error: null }); // Set loading state
    try {
      const response = await axiosInstance.get(`/api/totalIncomeAndExpense/${id}`);
      const { totalIncome, totalExpenses } = response.data; // Destructure response data
      set({
        totalIncome,
        totalExpenses,
        netIncome: totalIncome - totalExpenses, // Calculate net income
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || 'Failed to fetch total income and expenses' });
    }
  },

  // Fetch maximum income and expense for a user
  fetchMaxIncomeAndExpense: async (id) => {
    set({ isLoading: true, error: null }); // Set loading state
    try {
      const response = await axiosInstance.get(`/api/maxIncomeAndExpense/${id}`);
      const { maxIncome, maxExpense } = response.data; // Destructure response data
      set({
        maxIncome,
        maxExpense,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || 'Failed to fetch maximum income and expenses' });
    }
  },

  // Fetch net income for a user
  fetchNetIncome: async (id) => {
    set({ isLoading: true, error: null }); // Set loading state
    try {
      const response = await axiosInstance.get(`/api/getNetIncome/${id}`);
      const { netIncome } = response.data; // Destructure response data
      set({
        netIncome,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || 'Failed to fetch net income' });
    }
  },

  // Fetch user incomes by ID
  fetchUserIncomes : async (id) => {
    set({ isLoading: true, error: null }); // Set loading state
    try {
      const response = await axiosInstance.get(`/api/income/${id}`);
      set({
        incomeList: response.data, // Store fetched incomes in state
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || 'Failed to fetch income list' });
    }
  },

  // Fetch user expenses by ID
  fetchUserExpenses : async (id) => {
    set({ isLoading: true, error: null }); // Set loading state
    try {
      const response = await axiosInstance.get(`/api/expenses/${id}`);
      set({
        expenseList: response.data, // Store fetched expenses in state
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || 'Failed to fetch expense list' });
    }
  },

  // Create a new income entry for a user
  createIncome : async (id, incomeData) => {
    set({ isLoading: true, error: null }); // Set loading state
    try {
      const response = await axiosInstance.post(`/api/createIncome/${id}`, incomeData);
      set((state) => ({
        incomeList: [...state.incomeList, response.data], // Add new income to the list
        isLoading: false,
      }));
      return false; 
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || 'Failed to create income' });
      return true; 
    }
  },

  // Delete an existing income entry for a user
  deleteIncome : async (id, incomeId) => {
    set({ isLoading: true, error: null }); // Set loading state
    try {
      await axiosInstance.delete(`/api/deleteIncome/${id}/${incomeId}`);
      set((state) => ({
        incomeList : state.incomeList.filter((income) => income._id !== incomeId), // Remove deleted income from the list
        isLoading:false,
      }));
      return false; 
    } catch (error) {
      set({ isLoading:false, error:error.response?.data?.message || 'Failed to delete income' });
      return true; 
    }
  },

  // Create a new expense entry for a user
  createExpense : async (id, expenseData) => {
    set({ isLoading:true,error:null}); // Set loading state
    try{
       const response=await axiosInstance.post(`/api/createExpense/${id}`,expenseData);
       set((state)=>({
           expenseList:[...state.expenseList,response.data], // Add new expense to the list
           isLoading:false,
       }));
       return false; 
   } catch(error){
       set({isLoading:false,error:error.response?.data?.message || 'Failed to create expense'});
       return true; 
   }
},

// Delete an existing expense entry for a user
deleteExpense : async (id, expenseId) => {
   set({isLoading:true,error:null}); // Set loading state
   try{
       await axiosInstance.delete(`/api/deleteExpense/${id}/${expenseId}`);
       set((state)=>({
           expenseList : state.expenseList.filter(expense=>expense._id !== expenseId), // Remove deleted expense from the list
           isLoading:false,
       }));
       return false;
   } catch(error){
       set({isLoading:false,error:error.response?.data?.message || 'Failed to delete expense'});
       return true; 
   }
},
}));

export default useFinanceStore; // Exporting the store for other components 
