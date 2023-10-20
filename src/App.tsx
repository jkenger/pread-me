// get data from lib/data.json

import Layout from "./components/Layout";
import Pread from "./components/Pread";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  // Hooks

  return (
    <TooltipProvider>
      <Layout>
        <Pread />
      </Layout>
    </TooltipProvider>
  );
}

export default App;
