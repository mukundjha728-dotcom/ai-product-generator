export default function LoadingState() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full p-6 md:p-8 w-full">
      <div className="animate-pulse flex flex-col gap-6">
        <div className="h-6 w-32 bg-gray-200 rounded-md"></div>
        <div className="h-8 bg-gray-200 rounded-md w-3/4"></div>
        
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
