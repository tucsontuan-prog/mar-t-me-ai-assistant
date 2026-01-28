import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Anchor } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-ocean-teal border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 ocean-gradient opacity-10" />
      
      {/* Wave pattern */}
      <div className="absolute bottom-0 left-0 right-0 opacity-20">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-32">
          <path
            fill="currentColor"
            className="text-ocean-teal"
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full ocean-gradient flex items-center justify-center">
            <Anchor className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">Maritime Chatbot</span>
        </div>

        {/* Auth forms */}
        {isLogin ? (
          <LoginForm
            onSuccess={() => navigate("/")}
            onSwitchToRegister={() => setIsLogin(false)}
          />
        ) : (
          <RegisterForm
            onSuccess={() => navigate("/")}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}

        {/* Footer */}
        <p className="mt-8 text-sm text-muted-foreground text-center">
          Trợ lý AI thông minh cho ngành vận tải biển
        </p>
      </div>
    </div>
  );
};

export default Auth;
