import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/community/Navbar";
import CommunityFooter from "../components/community/CommunityFooter";
import { STORY_CARDS, IFEOMA_STORY, DIETITIAN_STORY, EVAREADY_STORY } from "../data/communityContent";

// Slug -> full story. A registry rather than a chain of slug comparisons: the
// page previously hardcoded "is this Ifeoma?" in five places, so a third story
// meant a third branch in each of them. Adding one is now a single line here.
const FULL_STORIES: Record<string, typeof IFEOMA_STORY | typeof DIETITIAN_STORY | typeof EVAREADY_STORY> = {
  "ifeoma-arua": IFEOMA_STORY,
  "lagos-dietitian-women-wellness": DIETITIAN_STORY,
  "emmanuel-amah-evaready": EVAREADY_STORY,
};

export default function CommunityStories() {
  const { slug } = useParams<{ slug?: string }>();
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  // Match active story object
  const activeStory = slug
    ? (FULL_STORIES[slug] ?? STORY_CARDS.find((s) => s.slug === slug) ?? null)
    : null;

  // Single Story Detail View
  if (activeStory) {
    const storyData = FULL_STORIES[activeStory.id] ?? DIETITIAN_STORY;
    // Optional extras, present on some stories and not others. Read off the
    // story itself rather than asking "which person is this".
    const instagram = "instagram" in storyData ? storyData.instagram : undefined;
    const posters = "posters" in storyData ? storyData.posters : undefined;

    return (
      <div className="min-h-screen bg-surface font-body-md text-on-surface">
        <Navbar />

        <main className="pt-20 sm:pt-24 pb-16 sm:pb-20">
          <div className="px-4 sm:px-6 md:px-gutter max-w-4xl mx-auto py-4 sm:py-6">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 text-primary font-bold text-xs sm:text-sm hover:underline mb-4 sm:mb-8"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to All Community Stories
            </Link>

            <article className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-outline-variant/30 shadow-lg sm:shadow-xl space-y-6 sm:space-y-10">
              {/* Header info */}
              <div className="border-b border-gray-100 pb-5 sm:pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                    {storyData.date} • {storyData.readTime}
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-on-surface leading-tight mt-1">
                    {storyData.title}
                  </h1>
                  <div className="text-primary font-medium text-xs sm:text-sm mt-2 sm:mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>By Kulawise</span>
                    {instagram && (
                      <>
                        <span className="text-gray-300">•</span>
                        <a
                          href={`https://instagram.com/${instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline font-bold text-emerald-700 inline-block"
                        >
                          {instagram}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Q&A Sections */}
              <div className="space-y-8 sm:space-y-12">
                {storyData.questions.map((item, index) => (
                  <div key={index} className="space-y-3 sm:space-y-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-950 flex items-start gap-2.5">
                      <span className="text-primary font-black text-base sm:text-xl">Q{index + 1}.</span>
                      <span>{item.q.replace(/^\d+\.\s*/, '')}</span>
                    </h2>
                    <div className="text-on-surface-variant text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line pl-3 sm:pl-4 border-l-2 border-primary/20 space-y-3 sm:space-y-4">
                      {item.a}
                    </div>

                    {/* Poster after the second answer, when the story has one. */}
                    {index === 1 && posters && posters[1] && (
                      <div className="my-5 sm:my-8 rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg border border-gray-100 max-w-2xl mx-auto cursor-pointer" onClick={() => setSelectedPoster(posters[1])}>
                        <img
                          src={posters[1]}
                          alt={`${storyData.name} story poster`}
                          className="w-full h-auto object-cover hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                    )}
                    {index === 2 && posters && posters[2] && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-5 sm:my-8">
                        {posters.slice(2).map((poster) => (
                          <img
                            key={poster}
                            src={poster}
                            alt={`${storyData.name} story poster`}
                            className="rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-100 w-full h-auto object-cover cursor-pointer"
                            onClick={() => setSelectedPoster(poster)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Closing thought */}
              <div className="bg-emerald-950 text-emerald-50 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl space-y-3 sm:space-y-4 relative overflow-hidden">
                <span className="material-symbols-outlined text-emerald-400 text-3xl sm:text-4xl block">format_quote</span>
                <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed italic whitespace-pre-line">
                  {storyData.closing}
                </p>
                <div className="pt-3 sm:pt-4 border-t border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-white text-sm sm:text-base">{storyData.name}</p>
                    <p className="text-xs text-emerald-300">{storyData.role}</p>
                  </div>
                  {instagram && (
                    <a
                      href={`https://instagram.com/${instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-200 hover:text-white border border-emerald-700/60 hover:bg-emerald-800/50 px-3 py-1.5 rounded-full transition-all inline-block w-fit font-semibold"
                    >
                      {instagram}
                    </a>
                  )}
                </div>
              </div>

              {/* Share callout */}
              <div className="text-center pt-4 sm:pt-6 space-y-2.5">
                <p className="text-on-surface-variant font-medium text-xs sm:text-sm">Have a story of your own to share?</p>
                <a
                  href="mailto:hello@kulawise.com?subject=My%20Kulawise%20Community%20Story"
                  className="inline-block bg-primary text-on-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-xl transition-all"
                >
                  Email Your Story to hello@kulawise.com
                </a>
              </div>
            </article>
          </div>

          {/* Poster Image Lightbox Modal */}
          {selectedPoster && (
            <div
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedPoster(null)}
            >
              <div className="relative max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl">
                <button
                  onClick={() => setSelectedPoster(null)}
                  className="absolute top-4 right-4 bg-black/60 text-white rounded-full p-2 hover:bg-black transition-colors z-10"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
                <img src={selectedPoster} alt="Poster View" className="w-full h-auto max-h-[85vh] object-contain" />
              </div>
            </div>
          )}
        </main>

        <CommunityFooter />
      </div>
    );
  }

  // Main Clean Cards Grid View (/stories)
  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      <Navbar />

      <main className="pt-20 sm:pt-24 pb-16 sm:pb-24">
        {/* Page Header */}
        <section className="px-4 sm:px-6 md:px-gutter max-w-container-max mx-auto text-center py-6 sm:py-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1 rounded-full mb-4 sm:mb-6">
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">favorite</span>
            <span className="font-label-caps uppercase tracking-wider text-[11px] sm:text-xs font-bold">
              Kulawise Community Stories
            </span>
          </div>
          <h1 className="font-headline-xl text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-on-surface leading-tight">
            Real People, Real Movement, <br className="hidden sm:block" /> Real Impact
          </h1>
          <p className="max-w-2xl mx-auto font-body-lg text-on-surface-variant text-sm sm:text-lg leading-relaxed">
            Discover how members across our communities turn daily discipline, quiet mornings, and shared runs into lasting personal transformation.
          </p>
        </section>

        {/* Uncluttered Story Cards Grid */}
        <section className="px-4 sm:px-6 md:px-gutter max-w-container-max mx-auto my-4 sm:my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {STORY_CARDS.map((story) => (
              <div
                key={story.id}
                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-outline-variant/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 sm:h-64 overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={story.title}
                      src={story.image}
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-extrabold text-on-surface shadow-sm">
                      {story.date}
                    </div>
                  </div>

                  <div className="p-5 sm:p-8 space-y-2.5 sm:space-y-4">
                    <div className={`flex items-center gap-1.5 font-label-bold text-[11px] sm:text-xs ${story.categoryColorClass}`}>
                      <span className="material-symbols-outlined text-sm sm:text-base">{story.icon}</span>
                      <span className="uppercase tracking-wider font-bold">{story.category}</span>
                    </div>

                    <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                      {story.title}
                    </h3>

                    <p className="text-on-surface-variant text-sm sm:text-base line-clamp-3 leading-relaxed">
                      {story.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-8 pt-0 flex items-center justify-between border-t border-gray-100 mt-2 sm:mt-4">
                  <div className="text-[11px] sm:text-xs text-on-surface-variant font-medium">
                    {story.readTime}
                  </div>
                  <Link
                    to={`/stories/${story.slug}`}
                    className="inline-flex items-center gap-1.5 text-primary font-bold text-xs sm:text-sm group-hover:translate-x-1 transition-transform"
                  >
                    Read Story
                    <span className="material-symbols-outlined text-xs sm:text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Email Callout */}
          <div className="mt-12 sm:mt-20 bg-emerald-950 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-14 text-center space-y-3 sm:space-y-4 shadow-xl">
            <h3 className="text-xl sm:text-3xl font-extrabold">Have a story of your own?</h3>
            <p className="text-emerald-200 max-w-xl mx-auto text-sm sm:text-base">
              Share your fitness journey, circle milestones, or daily habits with the community.
            </p>
            <div className="pt-2">
              <a
                href="mailto:hello@kulawise.com?subject=My%20Kulawise%20Community%20Story"
                className="inline-block bg-primary text-on-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm shadow-md hover:shadow-xl transition-all"
              >
                Send an email to hello@kulawise.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <CommunityFooter />
    </div>
  );
}
