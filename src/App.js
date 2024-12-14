import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddRuneSet from "./pages/AddRuneSet";
import MyRuneSets from "./pages/MyRuneSets";
import styled from "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">홈</Link>
          <Link to="/add">새로운 룬 추가</Link>
          <Link to="/sets">내 룬 세트 보기</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddRuneSet />} />
          <Route path="/sets" element={<MyRuneSets />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
