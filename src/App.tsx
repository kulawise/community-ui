import { useState } from "react";
import Hero from "./components/Hero";
import SurveyModal from "./components/SurveyModal";
import MetricsDashboard from "./components/MetricsDashboard";
import Footer from "./components/Footer";
import SuccessStoryForm from "./components/SuccessStoryForm";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessStory, setShowSuccessStory] = useState(false);

  const handleJoinClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShareStoryClick = () => {
    setShowSuccessStory(true);
  };

  const handleCloseSuccessStory = () => {
    setShowSuccessStory(false);
  };

  if (showSuccessStory) {
    return <SuccessStoryForm onClose={handleCloseSuccessStory} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero
        onJoinClick={handleJoinClick}
        onShareStoryClick={handleShareStoryClick}
      />
      <MetricsDashboard />
      <Footer />
      <SurveyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
