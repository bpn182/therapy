"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { use, useState } from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
  // Initialize QueryClient only once using useState's lazy initialization
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
