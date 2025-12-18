import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HealthBingo from "./pages/HealthBingo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/2025-bingo" element={<HealthBingo />} />
    </Routes>
  );
}

export default App;
