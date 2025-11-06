import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function RegisterLogin() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("register");
  const [, navigate] = useLocation();

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    village: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    adminCode: "",
    isAdmin: false,
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // ✅ Handle Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password check
    if (registerData.password !== registerData.confirmPassword) {
      return toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
    }

    // Terms check
    if (!registerData.acceptTerms) {
      return toast({
        title: "Error",
        description: "Please accept the terms and conditions.",
        variant: "destructive",
      });
    }

    // ✅ Admin code validation
    if (registerData.isAdmin && !registerData.adminCode.trim()) {
      return toast({
        title: "Missing Admin Code",
        description: "Admin code is required for admin registration.",
        variant: "destructive",
      });
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: registerData.fullName,
          email: registerData.email,
          phone: registerData.phone,
          village: registerData.village,
          password: registerData.password,
          role: registerData.isAdmin ? "admin" : "villager",
          adminCode: registerData.isAdmin ? registerData.adminCode : undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Registered Successfully!",
          description: "Please login to continue.",
        });
        setActiveTab("login");
      } else {
        toast({
          title: "Error",
          description: data.message || "Registration failed.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Server Error",
        description: "Could not connect to backend.",
        variant: "destructive",
      });
    }
  };

  // ✅ Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      if (res.ok) {
        // Adjust keys if your backend returns slightly different structure
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userVillage", data.village);
        localStorage.setItem("userName", data.fullName);

        toast({
          title: "Login Successful",
          description: `Welcome ${data.fullName}!`,
        });
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast({
          title: "Login Failed",
          description: data.message || "Invalid credentials.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Could not connect to backend.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 bg-muted/30 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full px-6">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-muted-foreground">
            Register or login to access all services
          </p>
        </div>

        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            {/* REGISTER FORM */}
            <TabsContent value="register" className="mt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    value={registerData.fullName}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, fullName: e.target.value })
                    }
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    type="text"
                    value={registerData.phone}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div>
                  <Label>Village</Label>
                  <Input
                    type="text"
                    value={registerData.village}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, village: e.target.value })
                    }
                    placeholder="Enter village name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, password: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Admin checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isAdmin"
                    checked={registerData.isAdmin}
                    onCheckedChange={(checked) =>
                      setRegisterData({
                        ...registerData,
                        isAdmin: checked === true,
                        adminCode: "",
                      })
                    }
                  />
                  <Label htmlFor="isAdmin">Register as Admin</Label>
                </div>

                {registerData.isAdmin ? (
                  <div>
                    <Label>Admin Code (For Admins Only)</Label>
                    <Input
                      type="text"
                      value={registerData.adminCode}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          adminCode: e.target.value,
                        })
                      }
                      placeholder="Enter admin code"
                      required
                    />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    *Villagers can skip admin code
                  </p>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={registerData.acceptTerms}
                    onCheckedChange={(checked) =>
                      setRegisterData({
                        ...registerData,
                        acceptTerms: checked === true,
                      })
                    }
                  />
                  <Label htmlFor="terms">I accept the terms and conditions</Label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!registerData.acceptTerms}
                >
                  Create Account
                </Button>
              </form>
            </TabsContent>

            {/* LOGIN FORM */}
            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
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
