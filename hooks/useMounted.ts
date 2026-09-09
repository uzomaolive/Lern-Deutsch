"use client";

import { useEffect, useState } from "react";

/**
 * True after hydration completes. Progress-derived UI must not render before
 * this, or server HTML (no localStorage) and client HTML would mismatch.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}