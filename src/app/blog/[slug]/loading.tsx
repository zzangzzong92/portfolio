export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <img src="/loading.gif" alt="로딩 중" className="h-12 w-12" />
        <p className="text-lg font-medium animate-pulse">페이지 로딩 중...</p>
      </div>
    </div>
  );
}
