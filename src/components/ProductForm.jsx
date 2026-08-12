import { CATEGORIES } from "../constants/categories";

export default function ProductForm({
  productName,
  setProductName,
  category,
  setCategory,
  handleGenerate,
  loading
}) {
  return (
    <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 p-6 md:p-8 relative overflow-hidden w-full">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="bg-fuchsia-500/20 text-fuchsia-400 p-1.5 rounded-lg border border-fuchsia-500/30">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </span>
        Product Information
      </h2>
      
      <form onSubmit={handleGenerate} className="space-y-5">
        <div>
          <label htmlFor="product-name" className="block text-sm font-medium text-indigo-100 mb-2">
            Product Name <span className="text-fuchsia-400">*</span>
          </label>
          <input
            id="product-name"
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-fuchsia-400/50 focus:border-fuchsia-400 transition-colors bg-white/5 text-white placeholder-indigo-200/40"
            placeholder="e.g., Wireless Noise Cancelling Headphones"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            disabled={loading}
            required
            maxLength={100}
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-indigo-100 mb-2">
            Category <span className="text-fuchsia-400">*</span>
          </label>
          <select
            id="category"
            className="w-full px-4 py-3 rounded-xl border border-white/10 focus:ring-2 focus:ring-fuchsia-400/50 focus:border-fuchsia-400 transition-colors bg-white/5 text-white placeholder-indigo-200/40 appearance-none [&>option]:text-slate-900"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            required
          >
            <option value="" disabled className="text-slate-500">Select a category...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading || !productName.trim() || !category}
          className="w-full mt-6 bg-gradient-to-r from-fuchsia-500 to-indigo-500 hover:from-fuchsia-400 hover:to-indigo-400 text-white font-semibold py-3 px-4 rounded-xl transition-all focus:ring-4 focus:ring-fuchsia-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-fuchsia-400/30"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating AI Magic...
            </>
          ) : (
            <>
              ✨ Generate Details
            </>
          )}
        </button>
      </form>
    </div>
  );
}
