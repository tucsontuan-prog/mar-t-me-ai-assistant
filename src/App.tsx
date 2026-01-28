import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import SeedData from "./pages/SeedData";
import Admin from "./pages/Admin";
import KnowledgeDocs from "./pages/KnowledgeDocs";
import ChatbotSettings from "./pages/ChatbotSettings";
import HeroSettings from "./pages/HeroSettings";
import LandingSettings from "./pages/LandingSettings";
import EmbedGuide from "./pages/EmbedGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/seed-data" element={<SeedData />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/knowledge-docs" element={<KnowledgeDocs />} />
                <Route path="/chatbot-settings" element={<ChatbotSettings />} />
                <Route path="/hero-settings" element={<HeroSettings />} />
                <Route path="/landing-settings" element={<LandingSettings />} />
                <Route path="/embed-guide" element={<EmbedGuide />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
