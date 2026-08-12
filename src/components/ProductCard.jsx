import { useState } from 'react';

export default function ProductCard({ product, onRegenerate }) {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const handleCopy = () => {
    const textToCopy = `Title: ${product.title}\nDescription: ${product.description}\nCategory: ${product.category || 'Product'}\nTags: ${product.keywords.map(k => '#' + k.replace(/\s+/g, '')).join(' ')}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full w-full">
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold tracking-wider uppercase rounded-md border border-gray-200">
            {product.category || 'Category'}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
          {product.title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed flex-1 text-base">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {product.keywords.map((keyword, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100"
            >
              #{keyword.replace(/\s+/g, '').toLowerCase()}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-5 border-t border-gray-100">
          <button 
            onClick={onRegenerate}
            className="flex-1 py-2 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Regenerate
          </button>
          <button 
            onClick={handleCopy}
            className="flex-1 py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Copied
              </>
            ) : (
              'Copy Content'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
