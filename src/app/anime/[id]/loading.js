export default function LoadingAnimeDetails() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-black/10 dark:border-white/10
      bg-gradient-to-br from-white/70 to-white/30 dark:from-[#0b1218]/70 dark:to-[#0b1218]/30
      backdrop-blur p-6 md:p-8 space-y-6">

      <div className="h-5 w-28 skeleton" />

      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Image skeleton */}
        <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
          <div className="h-[340px] w-full skeleton" />
        </div>

        {/* Text skeletons */}
        <div className="space-y-4">
          <div className="h-10 w-2/3 skeleton" />
          <div className="space-y-2">
            <div className="h-3 w-full skeleton" />
            <div className="h-3 w-5/6 skeleton" />
            <div className="h-3 w-3/4 skeleton" />
          </div>

          {/* Chips */}
          <div className="flex gap-2 pt-1">
            <div className="h-5 w-20 rounded-full skeleton" />
            <div className="h-5 w-16 rounded-full skeleton" />
            <div className="h-5 w-24 rounded-full skeleton" />
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 space-y-2">
              <div className="h-3 w-16 skeleton" />
              <div className="h-5 w-12 skeleton" />
            </div>
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 space-y-2">
              <div className="h-3 w-16 skeleton" />
              <div className="h-5 w-12 skeleton" />
            </div>
            <div className="rounded-lg border border-black/10 dark:border-white/10 p-3 space-y-2">
              <div className="h-3 w-16 skeleton" />
              <div className="h-5 w-24 skeleton" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}