# Advanced Expense Tracker

## Description
An advanced expense tracker built with **React**, **Zustand**, **Axios**, and **Tailwind CSS**. This application allows users to log, view, and manage their **income** and **expenses**, with features for visualizing financial data and ensuring secure access through **JWT authentication**.

---

## Key Features
- **User Authentication**: 
  - Login and registration using **JWT** for secure authentication.
  - User data management with **Zustand** for centralized state handling.
  
- **Financial Tracking**: 
  - Track income and expenses.
  - Calculate **net income** and view the **maximum income/expense** records.
  
- **Protected Routes**: 
  - Restrict access to certain pages (e.g., Log Expense, Log Income, Graph, History) for authenticated users only.
  
- **Graphical Visualization**: 
  - Visualize income and expenses with dynamic charts powered by **Chart.js** and **react-chartjs-2**.

- **Notifications**: 
  - User-friendly error handling and notifications using **react-toastify**.

---

## Tech Stack
- **Frontend**: 
  - **React** – JavaScript library for building user interfaces.
  - **Tailwind CSS** – Utility-first CSS framework for styling.
  
- **State Management**: 
  - **Zustand** – Simple state management for React.
  
- **API Communication**: 
  - **Axios** – Promise-based HTTP client for making requests.
  
- **Charting**: 
  - **Chart.js** – Library for drawing charts and graphs.
  - **react-chartjs-2** – React wrapper for **Chart.js**.
  
- **Authentication**: 
  - **JWT (JSON Web Tokens)** for secure login sessions.
  
- **Notifications**: 
  - **React Toastify** for displaying toasts and error messages.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repo-url>
Navigate to the project directory:

bash
Copy
Edit
cd advanced-expense-tracker
Install the dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
Open the application in your browser at http://localhost:3000.

**Contributing** -
Feel free to open an issue or submit a pull request if you'd like to contribute to the project.

