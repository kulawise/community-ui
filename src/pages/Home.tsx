import Navbar from "../components/community/Navbar";
import Hero from "../components/Hero";
import LiveImpactStrip from "../components/community/LiveImpactStrip";
import MethodologySection from "../components/community/MethodologySection";
import SDGTeaserSection from "../components/community/SDGTeaserSection";
import StoriesPreview from "../components/community/StoriesPreview";
import B2BCallouts from "../components/community/B2BCallouts";
import NewsletterSignup from "../components/community/NewsletterSignup";
import CommunityFooter from "../components/community/CommunityFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <LiveImpactStrip />
        <MethodologySection />
        <SDGTeaserSection />
        <StoriesPreview />
        <B2BCallouts />
        <NewsletterSignup />
      </main>
      <CommunityFooter />
    </div>
  );
}
