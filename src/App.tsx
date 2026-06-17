import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RouterProvider } from "react-router-dom";
import router from "./lib/routes";

const App = () => (
  <TooltipProvider>
    <Sonner />
    <RouterProvider router={router} />
  </TooltipProvider>
);

export default App;
