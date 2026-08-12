import { useState } from 'react';

export default function ProductCard({ product, onRegenerate }) {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const handleCopy = () => {
    const textToCopy = `Title: ${product.title}\nDescription: ${product.description}\nCategory: ${product.category}\nTags: ${product.keywords.map(k => '#' + k.replace(/\s+/g, '')).join(' ')}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 overflow-hidden flex flex-col h-full animate-in fade-in slide-in-from-bottom-8 duration-700 w-full relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-20"></div>
      
      {/* Dynamic contextual image based on AI generated keywords */}
      <div className="h-56 relative overflow-hidden group">
         <img 
           src={`https://loremflickr.com/600/400/${product.keywords[0].replace(/[^a-zA-Z0-9]/g, '')}`} 
           alt={product.title}
           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
           loading="lazy"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent"></div>
         <div className="absolute bottom-4 left-6 z-10">
            <span className="px-4 py-1.5 bg-fuchsia-500/90 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg text-white border border-fuchsia-400/50">
              {product.category}
            </span>
         </div>
      </div>

      <div className="p-6 md:p-8 flex-1 flex flex-col relative z-10">
        <h3 className="text-2xl font-bold text-white mb-4 leading-tight drop-shadow-md">
          {product.title}
        </h3>
        
        <p className="text-indigo-100/80 mb-8 leading-relaxed flex-1 font-light text-[17px]">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-10">
          {product.keywords.map((keyword, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium bg-indigo-500/20 text-indigo-200 border border-indigo-500/30"
            >
              #{keyword.replace(/\s+/g, '').toLowerCase()}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-auto pt-5 border-t border-white/10">
          <button 
            onClick={onRegenerate}
            className="flex-1 py-3 px-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-indigo-100 text-sm font-semibold rounded-xl transition-all focus:ring-4 focus:ring-fuchsia-500/20 shadow-sm"
          >
            Regenerate
          </button>
          <button 
            onClick={handleCopy}
            className="flex-1 py-3 px-4 bg-white hover:bg-indigo-50 text-slate-900 text-sm font-semibold rounded-xl transition-all focus:ring-4 focus:ring-white/50 flex items-center justify-center gap-2 shadow-lg"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Copied
              </>
            ) : (
              <>Copy Content</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
