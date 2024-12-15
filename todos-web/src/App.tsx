import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  AuthLayout,
  ErrorBoundary,
  ErrorBoundaryFallback,
  JoinPage,
  LoadingPage,
  LoginPage,
  Main,
  RequireAuth,
} from "./components";
import { queryClient } from "./services";

export const App: React.FC = () => {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingPage />}>
          <BrowserRouter>
            <Routes>
              <Route
                index
                element={
                  <RequireAuth>
                    <Main />
                  </RequireAuth>
                }
              />
              <Route element={<AuthLayout />}>
                <Route path="join" element={<JoinPage />} />
                <Route path="login" element={<LoginPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
