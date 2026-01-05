import { useState } from "react";
import { Search, Filter, Briefcase } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { JobCard } from "@/components/dashboard/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const allJobs = [
  {
    id: "1",
    title: "E-commerce Platform Development",
    company: "TechCorp Inc.",
    budget: "$5,000 - $8,000",
    deadline: "Dec 15, 2024",
    bidsCount: 12,
    tags: ["React", "Node.js", "PostgreSQL"],
    status: "open" as const,
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    company: "StartupXYZ",
    budget: "$2,500 - $4,000",
    deadline: "Dec 20, 2024",
    bidsCount: 8,
    tags: ["Figma", "Mobile Design", "Prototyping"],
    status: "open" as const,
  },
  {
    id: "3",
    title: "API Integration Services",
    company: "DataFlow Systems",
    budget: "$3,000 - $5,000",
    deadline: "Dec 10, 2024",
    bidsCount: 15,
    tags: ["REST API", "Python", "AWS"],
    status: "in-progress" as const,
  },
  {
    id: "4",
    title: "Brand Identity Package",
    company: "NewVenture Co.",
    budget: "$1,500 - $2,500",
    deadline: "Dec 25, 2024",
    bidsCount: 6,
    tags: ["Branding", "Logo Design", "Guidelines"],
    status: "open" as const,
  },
  {
    id: "5",
    title: "WordPress Website Migration",
    company: "MediaHouse AB",
    budget: "$2,000 - $3,500",
    deadline: "Jan 5, 2025",
    bidsCount: 9,
    tags: ["WordPress", "PHP", "MySQL"],
    status: "open" as const,
  },
  {
    id: "6",
    title: "Data Analytics Dashboard",
    company: "InsightPro",
    budget: "$6,000 - $10,000",
    deadline: "Jan 10, 2025",
    bidsCount: 4,
    tags: ["Python", "D3.js", "BigQuery"],
    status: "open" as const,
  },
  {
    id: "7",
    title: "SEO Optimization Project",
    company: "GrowthLabs",
    budget: "$1,000 - $2,000",
    deadline: "Dec 30, 2024",
    bidsCount: 11,
    tags: ["SEO", "Content Strategy", "Analytics"],
    status: "in-progress" as const,
  },
  {
    id: "8",
    title: "Custom CRM Development",
    company: "SalesForce Partners",
    budget: "$8,000 - $12,000",
    deadline: "Feb 1, 2025",
    bidsCount: 7,
    tags: ["React", "Node.js", "MongoDB"],
    status: "open" as const,
  },
];

const filterCategories = ["All", "Open", "In Progress"];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Open" && job.status === "open") ||
      (activeFilter === "In Progress" && job.status === "in-progress");
    
    return matchesSearch && matchesFilter;
  });

  const openJobsCount = allJobs.filter((job) => job.status === "open").length;

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Alla Jobb</h1>
            <p className="text-sm text-muted-foreground">
              {openJobsCount} öppna projekt väntar på dig
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 p-4 rounded-xl border border-border bg-card/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Sök jobb, företag eller teknologi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          <div className="flex items-center gap-2">
            {filterCategories.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="text-sm"
              >
                {filter === "All" ? "Alla" : filter === "Open" ? "Öppna" : "Pågående"}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          Visar <span className="font-medium text-foreground">{filteredJobs.length}</span> av {allJobs.length} jobb
        </p>
        <Badge variant="secondary" className="text-xs">
          {openJobsCount} öppna
        </Badge>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-foreground mb-1">Inga jobb hittades</p>
          <p className="text-muted-foreground">Försök med en annan sökterm eller filter</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Jobs;
