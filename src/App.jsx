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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl w-full mx-auto">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-5 w-full">
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
          <div className="lg:col-span-7 h-full min-h-[400px] w-full">
            {loading ? (
              <LoadingState />
            ) : generatedProduct ? (
              <ProductCard 
                product={generatedProduct} 
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
