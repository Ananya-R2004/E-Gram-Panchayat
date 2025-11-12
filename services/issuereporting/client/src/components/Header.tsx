import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

interface HeaderProps {
  title: string;
  role?: "villager" | "admin";
  onRoleChange?: (role: "villager" | "admin") => void;
}

export function Header({ title, role, onRoleChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary">
            <Building2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold" data-testid="text-header-title">{title}</h1>
            <p className="text-xs text-muted-foreground">E-GramPanchayat Portal</p>
          </div>
        </div>

        {role && onRoleChange && (
          <div className="flex items-center gap-2">
            <Button
              variant={role === "villager" ? "default" : "outline"}
              size="sm"
              onClick={() => onRoleChange("villager")}
              data-testid="button-switch-villager"
            >
              Villager View
            </Button>
            <Button
              variant={role === "admin" ? "default" : "outline"}
              size="sm"
              onClick={() => onRoleChange("admin")}
              data-testid="button-switch-admin"
            >
              Admin View
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
