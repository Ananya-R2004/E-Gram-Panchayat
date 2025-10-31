import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function RegisterLogin() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("register");
  
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    village: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register submitted:", registerData);
    toast({
      title: "Registration Successful!",
      description: "Welcome to E-Gram Panchayat. Please check your email to verify your account.",
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", loginData);
    toast({
      title: "Login Successful!",
      description: "Welcome back to E-Gram Panchayat.",
    });
  };

  return (
    <section id="register" className="py-20 bg-muted/30">
      <div className="max-w-xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-muted-foreground">
            Register or login to access all services
          </p>
        </div>

        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="register" data-testid="tab-register">Register</TabsTrigger>
              <TabsTrigger value="login" data-testid="tab-login">Login</TabsTrigger>
            </TabsList>

            <TabsContent value="register" className="mt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-fullName">Full Name</Label>
                  <Input
                    id="reg-fullName"
                    placeholder="Enter your full name"
                    value={registerData.fullName}
                    onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                    required
                    data-testid="input-register-name"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                      data-testid="input-register-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-phone">Phone</Label>
                    <Input
                      id="reg-phone"
                      type="tel"
                      placeholder="+91 1234567890"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      required
                      data-testid="input-register-phone"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reg-village">Village</Label>
                  <Input
                    id="reg-village"
                    placeholder="Enter your village name"
                    value={registerData.village}
                    onChange={(e) => setRegisterData({ ...registerData, village: e.target.value })}
                    required
                    data-testid="input-register-village"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="Create password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                      data-testid="input-register-password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-confirmPassword">Confirm Password</Label>
                    <Input
                      id="reg-confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                      data-testid="input-register-confirm-password"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="reg-terms"
                    checked={registerData.acceptTerms}
                    onCheckedChange={(checked) =>
                      setRegisterData({ ...registerData, acceptTerms: checked as boolean })
                    }
                    data-testid="checkbox-accept-terms"
                  />
                  <Label htmlFor="reg-terms" className="text-sm cursor-pointer">
                    I accept the terms and conditions
                  </Label>
                </div>

                <Button type="submit" className="w-full" data-testid="button-submit-register">
                  Create Account
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email or Phone</Label>
                  <Input
                    id="login-email"
                    type="text"
                    placeholder="Enter email or phone"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    data-testid="input-login-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    data-testid="input-login-password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="login-remember"
                      checked={loginData.rememberMe}
                      onCheckedChange={(checked) =>
                        setLoginData({ ...loginData, rememberMe: checked as boolean })
                      }
                      data-testid="checkbox-remember-me"
                    />
                    <Label htmlFor="login-remember" className="text-sm cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => {
                      console.log("Forgot password clicked");
                      toast({ title: "Password Reset", description: "Check your email for reset instructions." });
                    }}
                    data-testid="button-forgot-password"
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button type="submit" className="w-full" data-testid="button-submit-login">
                  Login
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </section>
  );
}
