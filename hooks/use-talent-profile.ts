"use client";

import { useEffect, useState } from "react";

/**
 * Custom React hook to fetch and read the talent profile state from local storage.
 */
export function useTalentProfile() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("vnp_talent_profile");
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return profile;
}
