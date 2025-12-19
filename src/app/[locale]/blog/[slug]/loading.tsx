export default function Loading() {
  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm bg-white/80">
      <div className="flex flex-col gap-4 items-center">
        <div className="w-12 h-12 rounded-full border-4 border-black animate-spin border-t-transparent"></div>
        <p className="text-lg font-semibold text-[#0B0B0B] animate-pulse">
          페이지 로딩 중...
        </p>
      </div>
    </div>
  );
}
