import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// NOTE: These utility imports usually rely on the alias '@/', we keep them as is.
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// 🛑 Pages: Using RELATIVE Paths
import Home from "./pages/Home";
import Register from "./pages/RegisterLogin";
import NotFound from "./pages/not-found";

// Service Pages using RELATIVE Paths
import ServicesPage from "./pages/services/Services"; 
import EducationPage from "./pages/services/EducationPage";
import HealthcarePage from "./pages/services/HealthcarePage";
import AgriculturePage from "./pages/services/AgriculturePage";
import SchemesPage from "./pages/services/SchemesPage";
import IssueReportingPage from "./pages/services/IssueReportingPage";

// 🛑 Admin Pages: Using RELATIVE Paths
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import ManageVillages from "./pages/admin/ManageVillages";

// 🛑 Villager Pages: Using RELATIVE Paths
import VillagerDashboard from "./pages/village/VillagerDashboard";
import VillagerAnnouncements from "./pages/village/VillagerAnnouncements";

function Router() {
  return (
    <Switch>
      {/* 🌐 Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Register} />

      {/* 🛠️ Services Routes (Must match Navbar dropdown links) */}
      <Route path="/services" component={ServicesPage} />
      <Route path="/services/education" component={EducationPage} />
      <Route path="/services/healthcare" component={HealthcarePage} />
      <Route path="/services/agriculture" component={AgriculturePage} />
      <Route path="/services/schemes" component={SchemesPage} />
      <Route path="/services/issue-reporting" component={IssueReportingPage} />


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
