export default function ProductArtwork({ illustration, accent = "bg-white/10" }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[28px]">
      <div className={`absolute inset-x-12 top-10 h-24 rounded-full ${accent} blur-3xl`} />
      <div className="absolute inset-x-10 bottom-10 h-px bg-white/10" />
      <div className="absolute inset-x-16 bottom-14 h-24 rounded-full bg-white/6 blur-2xl" />
      <div className="absolute bottom-6 left-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
        {illustration}
      </div>
    </div>
  );
}
