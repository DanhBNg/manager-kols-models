"use client";

import * as React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Force dark mode to ensure the premium dark Matte Black/Deep Navy oklch values are active
    document.documentElement.classList.add("dark");
  }, []);

  return <>{children}</>;
}
