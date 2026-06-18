import { B2B_CALLOUTS } from "../../data/communityContent";

export default function B2BCallouts() {
  return (
    <section id="partners" className="py-20 px-gutter max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {B2B_CALLOUTS.map((item, index) => (
          <div
            key={item.title}
            className={`relative rounded-2xl overflow-hidden p-12 group ${
              index === 0
                ? "bg-on-surface text-surface"
                : "bg-primary text-on-primary"
            }`}
          >
            {item.image && (
              <div className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30">
                <img
                  className="w-full h-full object-cover"
                  alt=""
                  src={item.image}
                />
              </div>
            )}
            <div className="relative z-10 space-y-4">
              <h3 className="font-headline-lg text-headline-lg">
                {item.title}
              </h3>
              <p
                className={`max-w-sm ${
                  index === 0 ? "text-surface/80" : "text-on-primary/80"
                }`}
              >
                {item.description}
              </p>
              <a
                href={item.href}
                className={`inline-block px-8 py-3 rounded-lg font-label-bold mt-4 transition-colors ${
                  index === 0
                    ? "bg-surface text-on-surface hover:bg-surface-container"
                    : "bg-on-primary text-primary hover:bg-surface/90"
                }`}
              >
                {item.ctaLabel}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
