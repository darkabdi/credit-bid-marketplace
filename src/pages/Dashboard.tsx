import { useState } from "react";
import { Briefcase, FileText, Coins, TrendingUp, MessageSquare } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { JobCard } from "@/components/dashboard/JobCard";
import { ChatModal } from "@/components/dashboard/ChatModal";
import { Button } from "@/components/ui/button";

const mockJobs = [
  {
    id: 1,
    title: "E-commerce Platform Development",
    company: "TechCorp Inc.",
    budget: "$5,000 - $8,000",
    deadline: "Dec 15, 2024",
    bidsCount: 12,
    tags: ["React", "Node.js", "PostgreSQL"],
    status: "open" as const,
  },
  {
    id: 2,
    title: "Mobile App UI/UX Design",
    company: "StartupXYZ",
    budget: "$2,500 - $4,000",
    deadline: "Dec 20, 2024",
    bidsCount: 8,
    tags: ["Figma", "Mobile Design", "Prototyping"],
    status: "open" as const,
  },
  {
    id: 3,
    title: "API Integration Services",
    company: "DataFlow Systems",
    budget: "$3,000 - $5,000",
    deadline: "Dec 10, 2024",
    bidsCount: 15,
    tags: ["REST API", "Python", "AWS"],
    status: "in-progress" as const,
  },
  {
    id: 4,
    title: "Brand Identity Package",
    company: "NewVenture Co.",
    budget: "$1,500 - $2,500",
    deadline: "Dec 25, 2024",
    bidsCount: 6,
    tags: ["Branding", "Logo Design", "Guidelines"],
    status: "open" as const,
  },
];

const Dashboard = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />

      <main className="ml-64 pt-16">
        <div className="p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Welcome back, John. Here's your overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Active Jobs"
              value={24}
              subtitle="3 pending review"
              icon={<Briefcase className="h-6 w-6 text-primary" />}
              trend={{ value: "12% this month", positive: true }}
            />
            <StatsCard
              title="My Bids"
              value={18}
              subtitle="5 accepted"
              icon={<FileText className="h-6 w-6 text-accent" />}
              trend={{ value: "8% this month", positive: true }}
            />
            <StatsCard
              title="Credit Balance"
              value="1,250"
              subtitle="Credits available"
              icon={<Coins className="h-6 w-6 text-warning" />}
            />
            <StatsCard
              title="Success Rate"
              value="87%"
              subtitle="Last 30 days"
              icon={<TrendingUp className="h-6 w-6 text-success" />}
              trend={{ value: "5% improvement", positive: true }}
            />
          </div>

          {/* Jobs Section */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Recent Jobs</h2>
              <p className="text-sm text-muted-foreground">Browse and bid on available projects</p>
            </div>
            <Button variant="outline">View All Jobs</Button>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {mockJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </main>

      {/* Floating Chat Button */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-transform hover:scale-105"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default Dashboard;
