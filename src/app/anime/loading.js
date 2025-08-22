export default function LoadingAnimeList() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-black/10 dark:border-white/10
      bg-gradient-to-br from-white/70 to-white/30 dark:from-[#0b1218]/70 dark:to-[#0b1218]/30
      backdrop-blur p-6 md:p-8 space-y-6">

      {/* Header skeletons */}
      <div className="space-y-3">
        <div className="h-6 w-40 skeleton" />
        <div className="h-8 w-56 skeleton" />
      </div>

      {/* Card grid skeletons */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10">
            <div className="h-44 w-full skeleton" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-2/3 skeleton" />
              <div className="h-3 w-full skeleton" />
              <div className="h-3 w-3/4 skeleton" />
              <div className="h-4 w-24 skeleton" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}