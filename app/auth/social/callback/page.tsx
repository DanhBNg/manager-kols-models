import { Suspense } from "react";
import SocialCallback from "../SocialCallback";

export default function SocialCallbackPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[70vh] items-center justify-center text-sm text-slate-400">Đang hoàn tất đăng nhập...</div>}>
      <SocialCallback />
    </Suspense>
  );
}
