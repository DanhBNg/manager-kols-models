import OnboardingForm from "@/components/OnboardingForm";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center py-4">
      <div className="mb-4 text-center">
        <h1 className="font-display text-xl font-bold text-white tracking-tight">Thiết lập Hồ sơ</h1>
        <p className="text-xs text-slate-400">Hoàn thiện 5 bước để khám phá thứ hạng & định hướng của bạn</p>
      </div>

      <OnboardingForm />
    </div>
  );
}
