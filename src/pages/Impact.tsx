import Navbar from "../components/community/Navbar";
import CommunityFooter from "../components/community/CommunityFooter";
import {
  SDG_DETAIL_CARDS,
  IMPACT_METHODOLOGY,
} from "../data/communityContent";

const [goal3, goal1, goal12, goal17] = SDG_DETAIL_CARDS;

export default function Impact() {
  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      <Navbar />
      <main className="pt-24 overflow-hidden">
        <section className="relative px-gutter max-w-container-max mx-auto py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-6">
            <span className="material-symbols-outlined text-[18px]">
              public
            </span>
            <span className="font-label-caps uppercase">
              Global Impact Framework
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl lg:text-[64px] leading-tight mb-8">
            Our Sustainable Development
            <br className="hidden lg:block" /> Goals Commitments
          </h1>
          <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Kulawise is more than a health app. Our technology and
            community-driven insights are built to align with the United
            Nations Sustainable Development Goals, so individual wellness
            contributes to a healthier, more sustainable community.
          </p>
        </section>

        <section className="px-gutter max-w-container-max mx-auto pb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Goal 3 — large, tinted card with target callout + bottom-right image */}
            <div className="md:col-span-8 bg-surface-container-low rounded-xl p-8 border border-outline-variant/30 flex flex-col justify-between min-h-[400px] overflow-hidden relative group">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`w-16 h-16 ${goal3.colorClass} rounded-lg flex items-center justify-center text-white`}
                  >
                    <span className="material-symbols-outlined text-4xl">
                      {goal3.icon}
                    </span>
                  </div>
                  <div>
                    <div
                      className={`${goal3.colorClass} text-white rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide w-fit mb-1`}
                    >
                      {goal3.goal}
                    </div>
                    <h3 className="font-headline-md text-headline-md">
                      {goal3.title}
                    </h3>
                  </div>
                </div>
                <div className="space-y-6 max-w-lg">
                  <div className="border-l-4 border-sdg-good-health pl-4">
                    <p className="font-label-caps text-on-surface-variant mb-1">
                      Specific Target
                    </p>
                    <p className="font-body-lg font-bold">{goal3.target}</p>
                  </div>
                  <div className="bg-white/60 p-6 rounded-lg border border-outline-variant/20">
                    <p className="font-label-caps text-primary mb-2">
                      Kulawise Action
                    </p>
                    <p className="font-body-md leading-relaxed text-on-surface-variant">
                      {goal3.action}
                    </p>
                  </div>
                </div>
              </div>
              {goal3.image && (
                <div className="mt-8 flex justify-end">
                  <img
                    className="w-48 h-48 object-cover rounded-xl shadow-lg border-2 border-white transform rotate-3 hover:rotate-0 transition-transform duration-300"
                    alt="A Kulawise Circle member training"
                    src={goal3.image}
                  />
                </div>
              )}
            </div>

            {/* Goal 1 — solid color card */}
            <div
              className={`md:col-span-4 ${goal1.colorClass} rounded-xl p-8 text-white flex flex-col justify-between overflow-hidden relative`}
            >
              <div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">
                    {goal1.icon}
                  </span>
                </div>
                <div
                  className={`bg-white text-sdg-no-poverty rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide w-fit mb-2`}
                >
                  {goal1.goal}
                </div>
                <h3 className="font-headline-md text-headline-md mb-4">
                  {goal1.title}
                </h3>
                <p className="font-body-md opacity-90 leading-snug mb-8 italic">
                  "{goal1.target}"
                </p>
              </div>
              <div className="bg-black/10 p-5 rounded-lg border border-white/20">
                <p className="font-label-caps mb-2 text-white/80">
                  Kulawise Action
                </p>
                <p className="font-body-md leading-tight">{goal1.action}</p>
              </div>
            </div>

            {/* Goal 12 — two-column tinted card with side image */}
            <div className="md:col-span-6 bg-surface-container-high rounded-xl p-8 border border-outline-variant/30 flex flex-col relative overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 ${goal12.colorClass} rounded-lg flex items-center justify-center text-white`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    {goal12.icon}
                  </span>
                </div>
                <div>
                  <div
                    className={`${goal12.colorClass} text-white rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide w-fit mb-1`}
                  >
                    {goal12.goal}
                  </div>
                  <h3 className="font-headline-md text-headline-md">
                    {goal12.title}
                  </h3>
                </div>
              </div>
              <p className="font-body-lg font-bold text-sdg-responsible-consumption mb-4">
                Target: {goal12.target}
              </p>
              <div className="flex-grow">
                <p className="font-label-caps text-on-surface-variant mb-2">
                  Kulawise Action
                </p>
                <p className="font-body-md text-on-surface-variant">
                  {goal12.action}
                </p>
              </div>
            </div>

            {/* Goal 17 — outlined card with mini feature grid */}
            <div className="md:col-span-6 border-2 border-sdg-partnerships rounded-xl p-8 flex flex-col bg-white transition-all hover:bg-sdg-partnerships/5">
              <div className="flex justify-between items-start mb-6">
                <div
                  className={`w-14 h-14 ${goal17.colorClass} rounded-lg flex items-center justify-center text-white`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    {goal17.icon}
                  </span>
                </div>
                <div
                  className={`${goal17.colorClass} text-white rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide`}
                >
                  {goal17.goal}
                </div>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">
                {goal17.title}
              </h3>
              <p className="font-body-lg text-sdg-partnerships font-bold mb-6">
                Target: {goal17.target}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-surface p-4 rounded-lg">
                  <span className="material-symbols-outlined text-sdg-partnerships mb-2 block">
                    account_balance_wallet
                  </span>
                  <p className="font-label-bold text-on-surface leading-tight">
                    Health Financing Access
                  </p>
                </div>
                <div className="bg-surface p-4 rounded-lg">
                  <span className="material-symbols-outlined text-sdg-partnerships mb-2 block">
                    security
                  </span>
                  <p className="font-label-bold text-on-surface leading-tight">
                    Micro-Insurance Integration
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-outline-variant/30">
                <p className="font-body-md text-on-surface-variant">
                  {goal17.action}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-on-surface text-surface py-24 px-gutter relative overflow-hidden">
          <div className="max-w-container-max mx-auto relative z-10">
            <h2 className="font-headline-lg text-headline-lg mb-6">
              Impact Methodology
            </h2>
            <p className="font-body-lg text-surface/80 leading-relaxed mb-8 max-w-2xl">
              Our commitments aren't just promises. We use a transparent,
              data-driven approach to track how every action within Kulawise
              contributes to the goals above.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
              {IMPACT_METHODOLOGY.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full border border-surface/30 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-md text-headline-md mb-2">
                      {item.title}
                    </h4>
                    <p className="font-body-md text-surface/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 text-center px-gutter max-w-container-max mx-auto">
          <h2 className="font-headline-xl text-headline-xl mb-6">
            Ready to make a difference?
          </h2>
          <p className="font-body-lg text-on-surface-variant max-w-xl mx-auto mb-12">
            Your daily habits add up. Join our community and start your
            journey toward personal and community wellness today.
          </p>
          <a
            href="https://kulawise.com"
            className="bg-primary text-on-primary px-10 py-5 rounded-full font-headline-md hover:shadow-xl transition-all hover:-translate-y-1 inline-block"
          >
            Join the Impact
          </a>
        </section>
      </main>
      <CommunityFooter />
    </div>
  );
}
