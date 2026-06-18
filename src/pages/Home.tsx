import { useState } from "react";
import Navbar from "../components/community/Navbar";
import Hero from "../components/Hero";
import LiveImpactStrip from "../components/community/LiveImpactStrip";
import MethodologySection from "../components/community/MethodologySection";
import SDGTeaserSection from "../components/community/SDGTeaserSection";
import StoriesPreview from "../components/community/StoriesPreview";
import B2BCallouts from "../components/community/B2BCallouts";
import NewsletterSignup from "../components/community/NewsletterSignup";
import CommunityFooter from "../components/community/CommunityFooter";
import SurveyModal from "../components/SurveyModal";
import SuccessStoryForm from "../components/SuccessStoryForm";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessStory, setShowSuccessStory] = useState(false);

  const handleJoinClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleShareStoryClick = () => setShowSuccessStory(true);
  const handleCloseSuccessStory = () => setShowSuccessStory(false);

  if (showSuccessStory) {
    return <SuccessStoryForm onClose={handleCloseSuccessStory} />;
  }

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      <Navbar onJoinClick={handleJoinClick} />
      <main className="pt-20">
        <Hero onJoinClick={handleJoinClick} />
        <LiveImpactStrip />
        <MethodologySection />
        <SDGTeaserSection />
        <StoriesPreview onShareStoryClick={handleShareStoryClick} />
        <B2BCallouts />
        <NewsletterSignup />
      </main>
      <CommunityFooter />
      <SurveyModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
