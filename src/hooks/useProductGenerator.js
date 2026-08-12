import { useState } from "react";
import { generateProductContent } from "../services/aiService";

export const useProductGenerator = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [generatedProduct, setGeneratedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();

    if (!productName.trim()) {
      setError("Please enter a product name.");
      return;
    }
    if (!category) {
      setError("Please select a category.");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const result = await generateProductContent(productName, category);
      setGeneratedProduct({ ...result, category }); // Include category for display
    } catch (err) {
      console.error(err);
      setError("Unable to generate content right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedProduct(null);
    setError("");
  };

  return {
    productName,
    setProductName,
    category,
    setCategory,
    generatedProduct,
    loading,
    error,
    setError,
    handleGenerate,
    handleReset
  };
};
