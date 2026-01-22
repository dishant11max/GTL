import { useNavigate } from "react-router-dom";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/stores/useAppStore";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminLogin() {
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (role) => {
    setIsLoading(true);
    setTimeout(() => {
      login(role);
      toast.success("Welcome back, Admin");
      navigate("/admin/orders");
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10" />

      <Card className="w-full max-w-sm z-10 shadow-xl border-t-4 border-t-primary">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
            <Truck className="w-7 h-7" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
          <CardDescription>
            Enter your credentials to access the command center.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Input
              id="email"
              type="email"
              placeholder="admin@dispatchly.com"
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Input id="password" type="password" value="password" disabled />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full"
            onClick={() => handleLogin("ADMIN")}
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "Demo Admin Login"}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            Secure Logistic Management System v1.0
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
