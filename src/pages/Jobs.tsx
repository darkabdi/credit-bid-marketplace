import { useState } from "react";
import { Search, Filter, MessageSquare } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { JobCard } from "@/components/dashboard/JobCard";
import { ChatModal } from "@/components/dashboard/ChatModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const allJobs = [
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
  {
    id: 5,
    title: "WordPress Website Migration",
    company: "MediaHouse AB",
    budget: "$2,000 - $3,500",
    deadline: "Jan 5, 2025",
    bidsCount: 9,
    tags: ["WordPress", "PHP", "MySQL"],
    status: "open" as const,
  },
  {
    id: 6,
    title: "Data Analytics Dashboard",
    company: "InsightPro",
    budget: "$6,000 - $10,000",
    deadline: "Jan 10, 2025",
    bidsCount: 4,
    tags: ["Python", "D3.js", "BigQuery"],
    status: "open" as const,
  },
  {
    id: 7,
    title: "SEO Optimization Project",
    company: "GrowthLabs",
    budget: "$1,000 - $2,000",
    deadline: "Dec 30, 2024",
    bidsCount: 11,
    tags: ["SEO", "Content Strategy", "Analytics"],
    status: "in-progress" as const,
  },
  {
    id: 8,
    title: "Custom CRM Development",
    company: "SalesForce Partners",
    budget: "$8,000 - $12,000",
    deadline: "Feb 1, 2025",
    bidsCount: 7,
    tags: ["React", "Node.js", "MongoDB"],
    status: "open" as const,
  },
];

const Jobs = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = allJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />

      <main className="ml-64 pt-16">
        <div className="p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Alla Jobb</h1>
            <p className="mt-1 text-muted-foreground">Bläddra och lägg bud på tillgängliga projekt</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Sök jobb..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Jobs Count */}
          <p className="mb-4 text-sm text-muted-foreground">
            Visar {filteredJobs.length} av {allJobs.length} jobb
          </p>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Inga jobb hittades som matchar din sökning.</p>
            </div>
          )}
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

export default Jobs;
