import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { ErrorBoundary } from "./components/error-handler/error-handler";
import { ClickhouseRemediationList } from "./pages/clickhouse-remediation-list";
import { RootLayout } from "./components/layouts/root-layout";
import { useGetAccessToken } from "./hooks/use-get-access-token";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "clickhouse-remediation",
        element: <ClickhouseRemediationList />,
      },
    ],
  },
]);

export const App = () => {
  const { getAccessToken } = useGetAccessToken();

  useEffect(() => {
    getAccessToken();
  }, []);

  return <RouterProvider router={router} />;
};
