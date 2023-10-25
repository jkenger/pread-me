// get data from lib/data.json

import ErrorBoundary from "./components/ErrorBoundary";
import Landing from "./components/Landing";
import Layout from "./components/Layout";
import Pread from "./components/Pread";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
        <Route index element={<Landing />} />
        <Route path="editor" element={<Pread />} />
      </Route>
    )
  );

  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  );
}

export default App;
