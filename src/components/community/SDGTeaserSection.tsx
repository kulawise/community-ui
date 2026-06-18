import { SDG_TEASER_GOALS } from "../../data/communityContent";

export default function SDGTeaserSection() {
  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
          <h2 className="font-headline-lg text-headline-lg">
            Impact That Matters
          </h2>
          <p className="text-on-surface-variant">
            Our growth is measured by more than just revenue. We align our
            core operations with the UN Sustainable Development Goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {SDG_TEASER_GOALS.map((sdg) => (
            <div
              key={sdg.goal}
              className={`${sdg.colorClass} p-6 rounded-lg text-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px]`}
            >
              <div>
                <span className="material-symbols-outlined mb-2 block">
                  {sdg.icon}
                </span>
                <div className="font-label-caps mb-2">{sdg.goal}</div>
                <h3 className="font-headline-md">{sdg.title}</h3>
              </div>
              <p className="text-sm opacity-90">{sdg.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
