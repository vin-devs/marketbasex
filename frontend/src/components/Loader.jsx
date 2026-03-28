const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-10">
      <div className="relative">
        {/* Outer Static Ring for Depth */}
        <div className="h-14 w-14 rounded-full border-4 border-slate-800/50"></div>

        {/* Spinning Ring with Indigo Glow */}
        <div className="absolute top-0 left-0 h-14 w-14 animate-spin rounded-full border-4 border-transparent border-t-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]"></div>

        {/* Inner Pulse Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-pink-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-[10px] font-black uppercase tracking-[4px] text-white animate-pulse">
          Processing
        </p>
        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
      </div>
    </div>
  );
};

export default Loader;
