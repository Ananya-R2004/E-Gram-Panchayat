import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Public pages
import Home from "./pages/Home";
import Register from "./pages/RegisterLogin";
import NotFound from "./pages/not-found";

// Services
import ServicesPage from "./pages/services/Services";
import EducationPage from "./pages/services/EducationPage";
import HealthcarePage from "./pages/services/HealthcarePage";
import AgriculturePage from "./pages/services/AgriculturePage";
import SchemesPage from "./pages/services/SchemesPage";
import IssueReportingPage from "./pages/services/IssueReportingPage";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import ManageVillages from "./pages/admin/ManageVillages";

// Villager
import VillagerDashboard from "./pages/village/VillagerDashboard";
import VillagerAnnouncements from "./pages/village/VillagerAnnouncements";

function Router() {
  return (
    <Switch>
      {/* PUBLIC */}
      <Route path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Register} />

      {/* SERVICES */}
      <Route path="/services" component={ServicesPage} />
      <Route path="/services/education" component={EducationPage} />
      <Route path="/education" component={EducationPage} />


      <Route path="/services/healthcare" component={HealthcarePage} />
      <Route path="/services/agriculture" component={AgriculturePage} />
      <Route path="/services/schemes" component={SchemesPage} />
      <Route path="/services/issue-reporting" component={IssueReportingPage} />

      {/* ADMIN */}
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/announcements" component={AdminAnnouncements} />
      <Route path="/admin/villages" component={ManageVillages} />

      {/* VILLAGER */}
      <Route path="/villager/dashboard" component={VillagerDashboard} />
      <Route path="/villager/announcements" component={VillagerAnnouncements} />

      {/* 404 */}
      <Route path="*" component={NotFound} />
    </Switch>
  );
}

export default function App() {
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
