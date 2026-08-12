import { useProductGenerator } from "./hooks/useProductGenerator";
import Header from "./components/Header";
import ProductForm from "./components/ProductForm";
import ProductCard from "./components/ProductCard";
import EmptyState from "./components/EmptyState";
import LoadingState from "./components/LoadingState";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const {
    productName,
    setProductName,
    category,
    setCategory,
    generatedProduct,
    loading,
    error,
    handleGenerate
  } = useProductGenerator();

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-fuchsia-500/30 selection:text-fuchsia-200 relative overflow-hidden flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Background Animated Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-fuchsia-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000 transform -translate-x-1/2"></div>
      
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-5 relative z-10 w-full">
            <ErrorMessage message={error} />
            <ProductForm
              productName={productName}
              setProductName={setProductName}
              category={category}
              setCategory={setCategory}
              handleGenerate={handleGenerate}
              loading={loading}
            />
          </div>

          {/* Right Column: Preview Area */}
          <div className="lg:col-span-7 h-full min-h-[500px] w-full">
            {loading ? (
              <LoadingState />
            ) : generatedProduct ? (
              <ProductCard 
                product={generatedProduct} 
                onRegenerate={handleGenerate} 
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
