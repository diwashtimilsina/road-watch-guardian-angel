
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Vehicle, Incident } from './types';
import { generateMockVehicles, generateMockIncidents } from './services/mockData';

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
import DriverPanel from "./pages/DriverPanel";
import DriverPanelAuth from "./pages/DriverPanelAuth";
import DriverLogin from "./pages/DriverLogin";
import DriverRegister from "./pages/DriverRegister";
import UserPanel from "./pages/UserPanel";

const queryClient = new QueryClient();

const App = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    // Initialize mock data
    const initialVehicles = generateMockVehicles(12);
    const initialIncidents = generateMockIncidents(initialVehicles, 5);
    
    setVehicles(initialVehicles);
    setIncidents(initialIncidents);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminPanel vehicles={vehicles} incidents={incidents} />} />
            <Route path="/driver" element={<DriverPanelAuth />} />
            <Route path="/driver-login" element={<DriverLogin />} />
            <Route path="/driver-register" element={<DriverRegister />} />
            <Route path="/user" element={<UserPanel vehicles={vehicles} incidents={incidents} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
