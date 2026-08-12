export default function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] w-full">
      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/5">
        <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">Ready to Create</h3>
      <p className="text-indigo-200/70 max-w-sm text-lg font-light">
        Fill out the product details on the left and watch the AI instantly generate beautiful, market-ready content.
      </p>
    </div>
  );
}
