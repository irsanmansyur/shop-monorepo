import React from "react";
import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { trpc } from "~/lib/trpc";
import { Toaster } from "../components/ui/sonner";

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API + "/api/trpc",
    }),
  ],
});

const BaseLayout: React.FC = () => {
  return (
    <>
      <div id="parentMain" className="relative h-screen overflow-y-auto">
        <QueryClientProvider client={queryClient}>
          <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <Outlet />
          </trpc.Provider>
        </QueryClientProvider>
        <Toaster />
      </div>
    </>
  );
};

export default BaseLayout;
