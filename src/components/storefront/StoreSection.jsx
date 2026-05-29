export default function StoreSection({ eyebrow, title, description, actions, children, id }) {
  return (
    <section id={id} className="py-20 sm:py-24 border-t border-white/6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-3">
            {eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-500">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
            {description ? <p className="text-sm leading-7 text-zinc-400 sm:text-base">{description}</p> : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
