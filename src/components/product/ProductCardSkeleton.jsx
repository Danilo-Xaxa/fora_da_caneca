export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-full mb-1" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
        <div className="flex items-center justify-between mt-4">
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="w-11 h-11 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
