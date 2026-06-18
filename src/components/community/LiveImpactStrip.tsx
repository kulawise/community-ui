import { LIVE_IMPACT_STATS } from "../../data/communityContent";

export default function LiveImpactStrip() {
  return (
    <section className="bg-primary py-8 border-y border-white/10 shadow-lg">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex flex-col md:flex-row justify-around items-center gap-8 text-center">
          {LIVE_IMPACT_STATS.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-8">
              <div className="space-y-1">
                <div className="font-headline-lg text-headline-lg text-on-primary">
                  {stat.value}
                </div>
                <div className="font-label-caps text-label-caps text-on-primary/80 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
              {index < LIVE_IMPACT_STATS.length - 1 && (
                <div className="w-px h-12 bg-on-primary/20 hidden md:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
