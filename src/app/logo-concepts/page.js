import Image from "next/image";

const concepts = [
  {
    name: "Crown Monogram",
    route: "/brand/mysticcommerce-logo-crown.svg",
    tone: "Heritage luxury",
    summary: "A gold MC monogram inside a star-cut crest, with a subtle bag-handle cue for ecommerce.",
  },
  {
    name: "Orbit Bag",
    route: "/brand/mysticcommerce-logo-orbit.svg",
    tone: "Modern marketplace",
    summary: "A premium shopping bag wrapped with a gold orbit, balancing tech discovery with commerce.",
  },
  {
    name: "Signal Crest",
    route: "/brand/mysticcommerce-logo-crest.svg",
    tone: "Professional flagship",
    summary: "A shield-style M mark for a more established, trust-forward MysticCommerce identity.",
  },
];

export const metadata = {
  title: "MysticCommerce Logo Concepts",
  description: "Premium logo concept options for the MysticCommerce brand identity.",
};

export default function LogoConceptsPage() {
  return (
    <div className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(245,158,11,0.16),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.12),transparent_24%),radial-gradient(circle_at_50%_90%,rgba(168,85,247,0.12),transparent_28%)]" />
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-300">Brand identity review</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">MysticCommerce logo concepts</h1>
          <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
            Three premium directions using the site&apos;s dark luxury palette, gold accents, and tech-commerce positioning. Each option is an editable SVG asset in <span className="text-zinc-200">public/brand</span>.
          </p>
        </div>

        <div className="mt-12 grid gap-8">
          {concepts.map((concept, index) => (
            <article key={concept.name} className="overflow-hidden rounded-[30px] border border-white/8 bg-white/[0.035]">
              <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
                <div className="flex min-h-[280px] items-center justify-center bg-[#07070a] p-4 sm:p-8">
                  <Image src={concept.route} alt={`${concept.name} logo concept`} width={720} height={240} className="h-auto w-full max-w-[720px]" />
                </div>

                <div className="flex flex-col justify-between border-t border-white/8 p-6 sm:p-8 lg:border-l lg:border-t-0">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-zinc-500">Option {index + 1}</p>
                      <p className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-200">
                        {concept.tone}
                      </p>
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold text-white">{concept.name}</h2>
                    <p className="mt-4 text-sm leading-7 text-zinc-400">{concept.summary}</p>
                  </div>

                  <div className="mt-8 rounded-[24px] border border-white/8 bg-black/20 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Small header test</p>
                    <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-[#101015] px-4 py-3">
                      <Image src={concept.route} alt="" width={720} height={240} className="h-10 w-auto max-w-[220px] object-contain object-left" />
                      <span className="rounded-xl bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#09090b]">Cart</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[28px] border border-white/8 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-sm leading-7 text-zinc-400">
            My recommendation is <span className="font-semibold text-white">Orbit Bag</span> if you want the clearest ecommerce signal, or <span className="font-semibold text-white">Signal Crest</span> if you want the most premium long-term brand mark.
          </p>
        </div>
      </div>
    </div>
  );
}
