import { LayoutDashboard, Briefcase, FileText, Coins, MessageSquare, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const { logout } = useAuth();
  const { t } = useLanguage();
  const isCollapsed = state === "collapsed";

  const navItems = [
    { icon: LayoutDashboard, label: t('sidebar.dashboard'), href: "/dashboard" },
    { icon: Briefcase, label: t('sidebar.jobs'), href: "/jobs" },
    { icon: FileText, label: t('sidebar.bids'), href: "/bids" },
    { icon: Coins, label: t('sidebar.credits'), href: "/credits" },
    { icon: MessageSquare, label: t('sidebar.messages'), href: "/messages" },
    { icon: User, label: t('sidebar.profile'), href: "/profile" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex h-14 items-center gap-3 px-2 hover:opacity-80 transition-opacity">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-semibold text-sidebar-foreground">BidHub</span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link to={item.href}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={`w-full justify-start gap-3 text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive ${isCollapsed ? "px-2" : "px-3"}`}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>{t('sidebar.logout')}</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}