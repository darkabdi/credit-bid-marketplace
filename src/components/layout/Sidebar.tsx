import { LayoutDashboard, Briefcase, FileText, Coins, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#", active: true },
  { icon: Briefcase, label: "Jobs", href: "#" },
  { icon: FileText, label: "Bids", href: "#" },
  { icon: Coins, label: "Credits", href: "#" },
  { icon: MessageSquare, label: "Messages", href: "#" },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">BidHub</span>
        </div>
      </div>

      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200",
              item.active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </a>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
        <div className="rounded-lg bg-secondary p-4">
          <p className="text-xs font-medium text-muted-foreground">Need help?</p>
          <p className="mt-1 text-sm font-medium text-foreground">Contact Support</p>
        </div>
      </div>
    </aside>
  );
}
