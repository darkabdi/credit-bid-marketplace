import { Link } from "react-router-dom";
import {
  Briefcase,
  FileText,
  DollarSign,
  Users,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";

const mockProjects = [
  {
    id: "1",
    title: "E-commerce Platform Development",
    freelancer: "John Smith",
    budget: "$7,500",
    deadline: "Dec 15, 2024",
    proposalsCount: 0,
    progress: 65,
    status: "in-progress" as const,
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    budget: "$3,500",
    deadline: "Dec 20, 2024",
    proposalsCount: 12,
    progress: 0,
    status: "open" as const,
  },
  {
    id: "3",
    title: "API Integration Services",
    freelancer: "Sarah Johnson",
    budget: "$4,000",
    deadline: "Dec 10, 2024",
    proposalsCount: 0,
    progress: 90,
    status: "review" as const,
  },
  {
    id: "4",
    title: "Brand Identity Package",
    budget: "$2,000",
    deadline: "Dec 25, 2024",
    proposalsCount: 8,
    progress: 0,
    status: "open" as const,
  },
];

const recentProposals = [
  {
    freelancer: "Alex Chen",
    project: "Mobile App UI/UX Design",
    amount: "$3,200",
    rating: 4.9,
    completedJobs: 47,
    time: "2 hours ago",
  },
  {
    freelancer: "Maria Garcia",
    project: "Mobile App UI/UX Design",
    amount: "$3,500",
    rating: 4.8,
    completedJobs: 32,
    time: "5 hours ago",
  },
  {
    freelancer: "David Kim",
    project: "Brand Identity Package",
    amount: "$1,800",
    rating: 4.7,
    completedJobs: 28,
    time: "1 day ago",
  },
];

const pendingMilestones = [
  {
    project: "E-commerce Platform Development",
    milestone: "Payment Gateway Integration",
    amount: "$2,000",
    dueDate: "Dec 8, 2024",
  },
  {
    project: "API Integration Services",
    milestone: "Final Delivery & Documentation",
    amount: "$1,500",
    dueDate: "Dec 10, 2024",
  },
];

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name}. Manage your projects.
          </p>
        </div>
        <Button asChild>
          <Link to="/create-project" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Post New Project
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Active Projects"
          value="4"
          trend={{ value: "2 in progress", positive: true }}
        />
        <StatsCard
          title="Pending Proposals"
          value="20"
          trend={{ value: "5 new today", positive: true }}
        />
        <StatsCard
          title="Total Spent"
          value="$48,250"
        />
        <StatsCard
          title="Active Freelancers"
          value="3"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Pending Proposals */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Proposals</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/client/proposals" className="flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProposals.map((proposal, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{proposal.freelancer}</p>
                      <p className="text-sm text-muted-foreground">{proposal.project}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{proposal.amount}</p>
                    <p className="text-xs text-muted-foreground">
                      ⭐ {proposal.rating} · {proposal.completedJobs} jobs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingMilestones.map((milestone, index) => (
                <div key={index} className="p-4 rounded-lg border space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-tight">{milestone.milestone}</p>
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground">{milestone.project}</p>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm font-semibold text-primary">{milestone.amount}</span>
                    <span className="text-xs text-muted-foreground">Due: {milestone.dueDate}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                Approve All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Your Projects</h2>
          <p className="text-sm text-muted-foreground">
            Monitor progress and manage your posted projects
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/client/projects">View All Projects</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
