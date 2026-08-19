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
import SuccessStoryForm from "../components/SuccessStoryForm";

export default function Home() {
  const [showSuccessStory, setShowSuccessStory] = useState(false);

  const handleShareStoryClick = () => setShowSuccessStory(true);
  const handleCloseSuccessStory = () => setShowSuccessStory(false);

  if (showSuccessStory) {
    return <SuccessStoryForm onClose={handleCloseSuccessStory} />;
  }

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <LiveImpactStrip />
        <MethodologySection />
        <SDGTeaserSection />
        <StoriesPreview onShareStoryClick={handleShareStoryClick} />
        <B2BCallouts />
        <NewsletterSignup />
      </main>
      <CommunityFooter />
    </div>
  );
}
