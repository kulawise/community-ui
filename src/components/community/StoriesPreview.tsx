import { STORY_CARDS } from "../../data/communityContent";

interface StoriesPreviewProps {
  onShareStoryClick: () => void;
}

export default function StoriesPreview({
  onShareStoryClick,
}: StoriesPreviewProps) {
  return (
    <section
      id="stories"
      className="py-20 max-w-container-max mx-auto px-gutter"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg">
            Community Stories
          </h2>
          <p className="text-on-surface-variant">
            Real impact, told by the people experiencing it.
          </p>
        </div>
        <a
          href="https://instagram.com/kulawise"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-label-bold flex items-center gap-2 hover:underline"
        >
          View All Stories
          <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STORY_CARDS.map((story) => (
          <div
            key={story.title}
            className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 transition-all hover:shadow-xl"
          >
            <div className="h-64 overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={story.title}
                src={story.image}
              />
            </div>
            <div className="p-6 space-y-3">
              <div
                className={`flex items-center gap-2 font-label-bold ${story.categoryColorClass}`}
              >
                <span className="material-symbols-outlined text-sm">
                  {story.icon}
                </span>
                {story.category}
              </div>
              <h4 className="font-headline-md">{story.title}</h4>
              <p className="text-on-surface-variant line-clamp-3">
                {story.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <button
          onClick={onShareStoryClick}
          className="text-on-surface-variant font-body-md hover:text-primary transition-colors underline"
        >
          Have a story of your own? Share it here.
        </button>
      </div>
    </section>
  );
}
