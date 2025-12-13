import { useState } from 'react';
import Hero from './components/Hero';
import SurveyModal from './components/SurveyModal';
import MetricsDashboard from './components/MetricsDashboard';
import Footer from './components/Footer';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero onJoinClick={handleJoinClick} />
      <MetricsDashboard />
      <Footer />
      <SurveyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
