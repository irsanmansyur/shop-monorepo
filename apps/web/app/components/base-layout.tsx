import React from "react";
import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "~/lib/trpc";
import { Toaster } from "../components/ui/sonner";

const queryClient = new QueryClient();

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
