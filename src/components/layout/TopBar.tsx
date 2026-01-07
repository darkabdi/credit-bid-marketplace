import { Bell, CreditCard, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/lib/i18n";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  onOpenChat?: () => void;
}
export function TopBar({ onOpenChat }: TopBarProps) {
  const {user} = useAuth()
  const navigate = useNavigate();

  const { t } = useLanguage();

  return (
    <div className="flex flex-1 items-center justify-between gap-2">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="relative flex-1 max-w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t('search')}
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <LanguageSwitcher />
        
        {/* Credits button - icon only on mobile */}
        <Button variant="accent" size="sm" className="gap-2 px-2 sm:px-3">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">{t('buyCredits')}</span>
        </Button>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-secondary">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
        </button>

        {/* User info - name hidden on mobile, avatar always visible */}
        <div 
          className="ml-1 sm:ml-2 flex items-center gap-2 sm:gap-3 border-l border-border pl-2 sm:pl-4 cursor-pointer"
          onClick={() => navigate('/profile')}
        >
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-foreground">{user?.name || "Loading..."}</p>
            <p className="text-xs text-muted-foreground">{user?.role}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shrink-0 hover:opacity-80 transition-opacity">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
