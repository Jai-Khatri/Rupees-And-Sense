import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx"; 
import Signup from "./Pages/Signup.jsx"; 
import LogExpense from "./Pages/LogExpense.jsx";
import LogIncome from "./Pages/LogIncome.jsx";
import History from "./Pages/History.jsx";
import useAuthStore from './store/useAuthStore';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Graph from "./Pages/Graph.jsx";

function App() {
  const { isAuthenticated } = useAuthStore(); 

  return (
    <Router>
      <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logExpense" element={isAuthenticated ? <LogExpense /> : <Navigate to="/login" />} />
          <Route path="/logIncome" element={isAuthenticated ? <LogIncome /> : <Navigate to="/login" />} />
          <Route path="/graph" element={isAuthenticated? <Graph/> : <Navigate to="/login" />} />
          <Route path="/history" element={isAuthenticated? <History/> : <Navigate to="/login" />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={1100}/>
      </div>
    </Router>
  );
}

export default App;
