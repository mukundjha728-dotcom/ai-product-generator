export default function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-gray-200 shadow-sm w-full min-h-[400px]">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Generated Content</h3>
      <p className="text-gray-500 max-w-sm text-base">
        Your generated product content will appear here. Enter a product name and category, then select "Generate Details".
      </p>
    </div>
  );
}
