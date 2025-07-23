import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./pages/Layout";
import Dashboard from "./components/Dashboard";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";
import ViewTodo from "./components/ViewTodo"; // 🆕 added

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/layout" element={<Layout />}>

            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create" element={<CreateTodo />} />
            <Route path="edittodo/:id" element={<EditTodo />} />
            <Route path="viewtodo/:id" element={<ViewTodo />} /> 

          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
