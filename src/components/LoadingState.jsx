export default function LoadingState() {
  return (
    <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 overflow-hidden flex flex-col h-full animate-pulse w-full">
      <div className="h-56 bg-white/5 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
      </div>
      
      <div className="p-6 md:p-8 flex-1 flex flex-col gap-6">
        <div className="h-8 bg-white/10 rounded-xl w-3/4 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
        
        <div className="space-y-4 flex-1">
          <div className="h-4 bg-white/5 rounded-md w-full relative overflow-hidden"></div>
          <div className="h-4 bg-white/5 rounded-md w-full relative overflow-hidden"></div>
          <div className="h-4 bg-white/5 rounded-md w-5/6 relative overflow-hidden"></div>
        </div>
        
        <div className="flex gap-2 mb-8">
          <div className="h-8 w-24 bg-indigo-500/20 rounded-xl relative overflow-hidden"></div>
          <div className="h-8 w-20 bg-indigo-500/20 rounded-xl relative overflow-hidden"></div>
          <div className="h-8 w-28 bg-indigo-500/20 rounded-xl relative overflow-hidden"></div>
        </div>

        <div className="flex gap-3 mt-auto pt-4 border-t border-white/10">
          <div className="h-12 flex-1 bg-white/5 rounded-xl relative overflow-hidden"></div>
          <div className="h-12 flex-1 bg-white/10 rounded-xl relative overflow-hidden"></div>
        </div>
      </div>
    </div>
  );
}
