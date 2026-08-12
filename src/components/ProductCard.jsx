import { useState, useEffect } from 'react';

export default function ProductCard({ product, onRegenerate, onRetryImage, isRetryingImage }) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [currentFallbackIndex, setCurrentFallbackIndex] = useState(-1);

  // Reset image state when a new product comes in
  useEffect(() => {
    setImgError(false);
    setCurrentFallbackIndex(-1);
  }, [product]);

  if (!product) return null;

  const handleCopy = () => {
    const textToCopy = `Title: ${product.title}\nDescription: ${product.description}\nCategory: ${product.category || 'Product'}\nTags: ${product.keywords.map(k => '#' + k.replace(/\s+/g, '')).join(' ')}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleImageError = () => {
    if (product.image && product.image.fallbacks && currentFallbackIndex + 1 < product.image.fallbacks.length) {
      setCurrentFallbackIndex(prev => prev + 1);
    } else {
      setImgError(true);
    }
  };

  // Determine current image URL
  const hasValidImageBase = product.image && !product.imageError;
  const currentImageUrl = hasValidImageBase 
    ? (currentFallbackIndex === -1 ? product.image.url : product.image.fallbacks[currentFallbackIndex]) 
    : null;

  const shouldShowImage = currentImageUrl && !imgError;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full w-full">
      
      {/* Image Section */}
      <div className="w-full h-64 bg-gray-50 border-b border-gray-200 relative overflow-hidden flex items-center justify-center">
        {shouldShowImage ? (
          <img 
            src={currentImageUrl} 
            alt={product.title}
            onError={handleImageError}
            loading="lazy"
            className="w-full h-full object-contain p-4 mix-blend-multiply"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 p-6 text-center">
            <svg className="w-12 h-12 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="text-sm font-medium mb-3">Relevant product image unavailable.</span>
            {onRetryImage && (
              <button 
                onClick={onRetryImage}
                disabled={isRetryingImage}
                className="px-4 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isRetryingImage ? 'Retrying...' : 'Retry Image'}
              </button>
            )}
          </div>
        )}
      </div>

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
