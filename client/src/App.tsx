import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// ✅ Pages
import Home from "@/pages/Home";
import Register from "@/pages/RegisterLogin";
import NotFound from "@/pages/not-found";

// ✅ Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminAnnouncements from "@/pages/admin/AdminAnnouncements";
import ManageVillages from "@/pages/admin/ManageVillages";

// ✅ Villager Pages
import VillagerDashboard from "@/pages/village/VillagerDashboard";
import VillagerAnnouncements from "@/pages/village/VillagerAnnouncements";

function Router() {
  return (
    <Switch>
      {/* 🌐 Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Register} />

      {/* 🧑‍💼 Admin Routes */}
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/announcements" component={AdminAnnouncements} />
      <Route path="/admin/villages" component={ManageVillages} />

      {/* 🧑‍🌾 Villager Routes */}
      <Route path="/villager/dashboard" component={VillagerDashboard} />
      <Route path="/villager/announcements" component={VillagerAnnouncements} />

      {/* 🚫 Fallback */}
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <main className="min-h-screen bg-background text-foreground">
          <Router />
        </main>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
