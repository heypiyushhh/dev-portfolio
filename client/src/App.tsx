import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "./pages/home";
import AdminLogin from "./pages/admin/login";
import AdminDashboard from "./pages/admin/dashboard";
import AdminProjects from "./pages/admin/projects";
import AdminSkills from "./pages/admin/skills";
import AdminTestimonials from "./pages/admin/testimonials";
import AdminMessages from "./pages/admin/messages";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/projects" component={AdminProjects} />
      <Route path="/admin/skills" component={AdminSkills} />
      <Route path="/admin/testimonials" component={AdminTestimonials} />
      <Route path="/admin/messages" component={AdminMessages} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
