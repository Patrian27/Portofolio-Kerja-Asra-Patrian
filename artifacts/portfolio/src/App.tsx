import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import Home from "@/pages/Home";
import Portfolio from "@/pages/Portfolio";
import Pengalaman from "@/pages/Services";
import Pendidikan from "@/pages/Pendidikan";
import Kontak from "@/pages/About";
import Sertifikat from "@/pages/Sertifikat";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();
  const isAdmin = location === "/admin";

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dokumentasi" component={Portfolio} />
          <Route path="/pengalaman" component={Pengalaman} />
          <Route path="/pendidikan" component={Pendidikan} />
          <Route path="/kontak" component={Kontak} />
          <Route path="/sertifikat" component={Sertifikat} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
