import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { ErrorBoundary } from "./components/error-handler/error-handler";
import { ClickhouseRemediationList } from "./pages/clickhouse-remediation-list";
import { RootLayout } from "./components/layouts/root-layout";
import { GetEmail } from "./pages/get-email";
import { Toaster } from "./components/ui/toaster";

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
        element: (
          <GetEmail>
            <ClickhouseRemediationList />
          </GetEmail>
        ),
      },
    ],
  },
]);

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};
