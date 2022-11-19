import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { HomeScreen } from "../views/HomeScreen";
import { LoginRegisterScreen } from "../views/LoginRegisterScreen";
import { WinesContainer } from "../views/WinesContainer";
import { WinesMain } from "../views/WinesMain";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route exact path="/home" element={<HomeScreen />} />
        <Route exact path="/register" element={<LoginRegisterScreen />} />
        <Route exact path="/login" element={<LoginRegisterScreen />} />
        <Route exact path="/nuevo-vino" element={<WinesContainer />} />
        <Route exact path="/vino/:id" element={<WinesContainer />} />
        <Route exact path="/mis-vinos" element={<WinesMain />} />
      </Routes>
    </BrowserRouter>
  );
};
