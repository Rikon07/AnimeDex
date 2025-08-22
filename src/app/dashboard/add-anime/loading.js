export default function LoadingAddAnime() {
  return (
    <div className="space-y-3 text-center max-w-2xl mx-auto">
      <div className="h-7 w-48 mx-auto skeleton" />
      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 space-y-3">
        <div className="h-10 w-full skeleton rounded-lg" />
        <div className="h-24 w-full skeleton rounded-lg" />
        <div className="h-10 w-full skeleton rounded-lg" />
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="h-10 w-full skeleton rounded-lg" />
          <div className="h-10 w-full skeleton rounded-lg" />
          <div className="h-10 w-full skeleton rounded-lg" />
        </div>
        <div className="h-10 w-full skeleton rounded-lg" />
        <div className="h-10 w-full skeleton rounded-lg" />
      </div>
    </div>
  );
}