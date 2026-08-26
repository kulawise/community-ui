import { Routes, Route } from "react-router-dom";
import Impact from "./pages/Impact";
import HealthBingo from "./pages/HealthBingo";
import BillionSteps from "./pages/events/BillionSteps";
import CommunityStories from "./pages/CommunityStories";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BillionSteps />} />
      <Route path="/stories" element={<CommunityStories />} />
      <Route path="/stories/:slug" element={<CommunityStories />} />
      <Route path="/impact" element={<Impact />} />
      <Route path="/2025-bingo" element={<HealthBingo />} />
    </Routes>
  );
}

export default App;
