import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import VillagerDashboard from "@/pages/VillagerDashboard";
import AdminDashboard from "@/pages/AdminDashboard";

function Router() {
  const [role, setRole] = useState<"villager" | "admin">("villager");

  return (
    <div className="min-h-screen bg-background">
      <Header
        title={role === "villager" ? "Issue Reporting" : "Admin Panel"}
        role={role}
        onRoleChange={setRole}
      />
      <main>
        {role === "villager" ? <VillagerDashboard /> : <AdminDashboard />}
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
