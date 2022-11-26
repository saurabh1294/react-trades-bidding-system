import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Project } from "./pages/Project";
import { ProjectDetail } from "./pages/ProjectDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route  path="/project/create" element={<Project/>}/>
        <Route  path="/project/:id" element={<ProjectDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
