import { useState, useEffect } from "react";
import { Search, Briefcase, Loader2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { JobCard } from "@/components/dashboard/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProjects } from "@/services/projectServices";
import { useLanguage } from "@/lib/i18n";

interface Project {
  _id: string;
  title: string;
  category: string;
  budget: number;
  description?: string;
  status?: "open" | "in-progress" | "closed";
  client?: { name: string };
  bids?: any[];
  createdAt?: string;
}

const Jobs = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const filterCategories = [
    { key: "All", label: t('jobs.all') },
    { key: "Open", label: t('jobs.open') },
    { key: "In Progress", label: t('jobs.inProgress') },
  ];

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const status = project.status || "open";
    const clientName = project.client?.name || "";
    
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Open" && status === "open") ||
      (activeFilter === "In Progress" && status === "in-progress");
    
    return matchesSearch && matchesFilter;
  });

  const openProjectsCount = projects.filter((p) => (p.status || "open") === "open").length;

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{t('jobs.title')}</h1>
            <p className="text-sm text-muted-foreground">
              {openProjectsCount} {t('jobs.openProjects')}
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
              placeholder={t('jobs.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          <div className="flex items-center gap-2">
            {filterCategories.map((filter) => (
              <Button
                key={filter.key}
                variant={activeFilter === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.key)}
                className="text-sm"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {t('jobs.showing')} <span className="font-medium text-foreground">{filteredProjects.length}</span> {t('jobs.of')} {projects.length} {t('jobs.jobs')}
        </p>
        <Badge variant="secondary" className="text-xs">
          {openProjectsCount} {t('jobs.openCount')}
        </Badge>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-16 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">{t('jobs.loading')}</p>
        </div>
      )}

      {/* Jobs Grid */}
      {!loading && filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <JobCard
              key={project._id}
              id={project._id}
              title={project.title}
              company={project.client?.name || t('common.client')}
              budget={`$${project.budget}`}
              deadline={t('jobs.open')}
              bidsCount={project.bids?.length || 0}
              tags={[project.category]}
              status={project.status || "open"}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProjects.length === 0 && (
        <div className="py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-foreground mb-1">{t('jobs.noJobsFound')}</p>
          <p className="text-muted-foreground">
            {projects.length === 0 
              ? t('jobs.noProjectsYet')
              : t('jobs.tryDifferentSearch')}
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Jobs;