import { Routes, Route } from "react-router-dom";
import Impact from "./pages/Impact";
import HealthBingo from "./pages/HealthBingo";
import BillionSteps from "./pages/events/BillionSteps";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BillionSteps />} />
      <Route path="/impact" element={<Impact />} />
      <Route path="/2025-bingo" element={<HealthBingo />} />
    </Routes>
  );
}

export default App;
