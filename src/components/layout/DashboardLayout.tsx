import { ReactNode, useState } from "react";
import { MessageSquare } from "lucide-react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { ChatModal } from "@/components/dashboard/ChatModal";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border flex items-center px-4 gap-4 bg-card">
            <SidebarTrigger />
            <TopBar />
          </header>

          <main className="flex-1 p-8">
            {children}
          </main>
        </div>

        {/* Floating Chat Button */}
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-transform hover:scale-105 z-50"
        >
          <MessageSquare className="h-6 w-6" />
        </button>

        <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
    </SidebarProvider>
  );
}
