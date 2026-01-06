import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Briefcase, FileText, Coins, TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { JobCard } from "@/components/dashboard/JobCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/authContext"; 
import { getProjects } from "@/services/projectServices";
import { useLanguage } from "@/lib/i18n";

const mockJobs = [
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
];

const FreelancerDashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const activeContracts = [
    {
      title: "API Integration Services",
      client: "DataFlow Systems",
      dueDate: "Dec 10, 2024",
      progress: 65,
    },
    {
      title: "Website Redesign",
      client: "Fashion Brand Co.",
      dueDate: "Dec 18, 2024",
      progress: 40,
    },
  ];

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setDbProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t('sidebar.dashboard')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('dashboard.welcome')}, {user?.name}. {t('dashboard.overview')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title={t('freelancer.activeContracts')}
          value="3"
          trend={{ value: `1 ${t('freelancer.newThisWeek')}`, positive: true }}
        />
        <StatsCard
          title={t('freelancer.pendingProposals')}
          value="8"
          trend={{ value: `2 ${t('freelancer.responses')}`, positive: true }}
        />
        <StatsCard
          title={t('freelancer.totalEarnings')}
          value="$24,580"
          trend={{ value: `12% ${t('freelancer.thisMonth')}`, positive: true }}
        />
        <StatsCard
          title={t('freelancer.successRate')}
          value="94%"
          trend={{ value: `5% ${t('freelancer.improvement')}`, positive: true }}
        />
      </div>

      {/* Active Contracts Section */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('freelancer.activeContracts')}</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/freelancer/contracts" className="flex items-center gap-1">
              {t('freelancer.viewAll')} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeContracts.map((contract, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-medium">{contract.title}</p>
                  <p className="text-sm text-muted-foreground">{contract.client}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm text-muted-foreground">{t('freelancer.due')}: {contract.dueDate}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${contract.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{contract.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Jobs Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">{t('freelancer.availableJobs')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('freelancer.browseJobs')}
          </p>
        </div>
        <Button asChild>
          <Link to="/jobs">{t('freelancer.viewAllJobs')}</Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {/* Database Projects */}
          {dbProjects.map((project) => (
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
          {/* Mock Jobs */}
          {mockJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default FreelancerDashboard;