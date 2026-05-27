"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BrandEntry() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/brand/dashboard");
  }, [router]);

  return (
    <div className="flex h-[80vh] items-center justify-center bg-[#03050c]">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
    </div>
  );
}
