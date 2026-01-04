import { Bell, CreditCard, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";

interface TopBarProps {
  onOpenChat?: () => void;
}
export function TopBar({ onOpenChat }: TopBarProps) {
  const {user} = useAuth()

  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search jobs, bids..."
            className="h-10 w-80 rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="accent" size="sm" className="gap-2">
          <CreditCard className="h-4 w-4" />
          Buy Credits
        </Button>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-secondary">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
        </button>

        <div className="ml-2 flex items-center gap-3 border-l border-border pl-4">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{user?.name || "Loading..."}</p>
            <p className="text-xs text-muted-foreground">{user?.role}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
