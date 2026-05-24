export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-[10px]">
              S
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              StackAudit
            </span>
            <span className="text-xs text-zinc-600">by Credex</span>
          </div>

          <p className="text-xs text-zinc-600 text-center">
            Your data is processed on-server and never sold. Pricing data verified May 2026.
          </p>

          <p className="text-xs text-zinc-700">
            &copy; {new Date().getFullYear()} Credex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
