import { useNavigate } from "react-router-dom";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/stores/useAppStore";
import { useState } from "react";
import { toast } from "sonner";

export default function DriverLogin() {
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
        login('DRIVER');
        toast.success("Welcome back, Driver");
        navigate("/driver/trip");
        setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground mb-4">
                <Truck className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Driver App</h1>
            <p className="text-muted-foreground">Log in to view your assigned trips.</p>
        </div>

        <div className="space-y-4">
            <div className="space-y-2">
                <Input type="tel" placeholder="Phone Number" className="h-12 text-lg" />
            </div>
            <div className="space-y-2">
                <Input type="password" placeholder="PIN Code" className="h-12 text-lg" />
            </div>
            <Button className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/20" onClick={handleLogin} disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
            </Button>
            <Button variant="outline" className="w-full h-12" onClick={handleLogin}>
                Demo Driver Login
            </Button>
        </div>
      </div>
    </div>
  );
}
