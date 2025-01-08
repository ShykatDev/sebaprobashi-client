"use client";

import MobxProvider from "@/common/providers/MobXProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AuthPrivider from "./AuthProvider";
import I18nProvider from "./I18nProvider";

const MainProvider = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <MobxProvider>
      <AuthPrivider>
        <QueryClientProvider client={queryClient}>
          <I18nProvider>{children}</I18nProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </QueryClientProvider>
      </AuthPrivider>
    </MobxProvider>
  );
};

export default MainProvider;
