export default function MethodologySection() {
  return (
    <section className="py-20 px-gutter max-w-container-max mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative rounded-2xl overflow-hidden h-[500px]">
          <img
            className="w-full h-full object-cover"
            alt="A Kulawise Circle member training"
            src="/images/young-woman-training-gym.jpg"
          />
        </div>
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full font-label-bold">
            Our Methodology
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            The Synergy of Intelligence &amp; Community
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            Kulawise isn't just another tracker. We use AI to analyze your
            habit patterns and give you precise, practical recommendations.
            But we know health isn't solitary.
          </p>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            We connect you with Kula Circles — communities run by coaches,
            gyms, and friends, dedicated to shared progress. Hyper-personalized
            data plus collective accountability is how we drive lasting
            change.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
              <span
                className="material-symbols-outlined text-primary mb-2"
                style={{ fontSize: "32px" }}
              >
                psychology
              </span>
              <div className="font-label-bold">AI Precision</div>
            </div>
            <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
              <span
                className="material-symbols-outlined text-sdg-good-health mb-2"
                style={{ fontSize: "32px" }}
              >
                groups
              </span>
              <div className="font-label-bold">Local Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
