import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/authContext";
interface StatsCardProps {
    title: String
    value: string
    trend: any


}

const recentDisputes = [
  {
    id: "1",
    title: "Payment dispute - E-commerce project",
    freelancer: "John Doe",
    client: "TechCorp Inc.",
    amount: "$2,500",
    status: "pending",
    date: "Dec 15, 2024",
  },
  {
    id: "2",
    title: "Scope disagreement - Mobile app",
    freelancer: "Jane Smith",
    client: "StartupXYZ",
    amount: "$1,800",
    status: "in-review",
    date: "Dec 14, 2024",
  },
  {
    id: "3",
    title: "Delivery delay - API integration",
    freelancer: "Mike Wilson",
    client: "DataFlow Systems",
    amount: "$3,200",
    status: "resolved",
    date: "Dec 12, 2024",
  },
];

const recentUsers = [
  {
    id: "1",
    name: "Sarah Connor",
    email: "sarah@example.com",
    type: "freelancer",
    status: "active",
    joinedDate: "Dec 18, 2024",
  },
  {
    id: "2",
    name: "TechVentures LLC",
    email: "contact@techventures.com",
    type: "client",
    status: "pending",
    joinedDate: "Dec 17, 2024",
  },
  {
    id: "3",
    name: "Alex Rivera",
    email: "alex.r@example.com",
    type: "freelancer",
    status: "active",
    joinedDate: "Dec 16, 2024",
  },
  {
    id: "4",
    name: "InnovateCo",
    email: "hello@innovate.co",
    type: "client",
    status: "active",
    joinedDate: "Dec 15, 2024",
  },
];

const recentJobs = [
  {
    id: "1",
    title: "Full-Stack Developer Needed",
    client: "TechCorp Inc.",
    budget: "$8,000",
    status: "active",
    bids: 15,
    posted: "Dec 18, 2024",
  },
  {
    id: "2",
    title: "UI/UX Design for Mobile App",
    client: "StartupXYZ",
    budget: "$4,500",
    status: "under-review",
    bids: 8,
    posted: "Dec 17, 2024",
  },
  {
    id: "3",
    title: "WordPress Website Migration",
    client: "LocalBiz Co.",
    budget: "$1,200",
    status: "flagged",
    bids: 22,
    posted: "Dec 16, 2024",
  },
];

const getDisputeStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="text-warning border-warning"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
    case "in-review":
      return <Badge variant="outline" className="text-primary border-primary"><Eye className="h-3 w-3 mr-1" /> In Review</Badge>;
    case "resolved":
      return <Badge variant="outline" className="text-success border-success"><CheckCircle className="h-3 w-3 mr-1" /> Resolved</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getJobStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-success/10 text-success hover:bg-success/20">Active</Badge>;
    case "under-review":
      return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Under Review</Badge>;
    case "flagged":
      return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Flagged</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getUserStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-success/10 text-success hover:bg-success/20">Active</Badge>;
    case "pending":
      return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Pending</Badge>;
    case "suspended":
      return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Suspended</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Platform overview and management tools
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Users"
          value="2,847"
          trend={{ value: "156 new this month", positive: true }}
        />
        <StatsCard
          title="Active Jobs"
          value="342"
          trend={{ value: "28 new today", positive: true }}
        />
        <StatsCard
          title="Open Disputes"
          value="12"
          trend={{ value: "3 pending review", positive: false }}
        />
        <StatsCard
          title="Platform Revenue"
          value="$48,250"
          trend={{ value: "18% vs last month", positive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        {/* Disputes Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Recent Disputes
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/disputes" className="flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDisputes.map((dispute) => (
                <div
                  key={dispute.id}
                  className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <p className="font-medium text-sm">{dispute.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {dispute.freelancer} vs {dispute.client}
                    </p>
                    <p className="text-xs text-muted-foreground">{dispute.date}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-sm font-semibold">{dispute.amount}</p>
                    {getDisputeStatusBadge(dispute.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Jobs Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Recent Jobs
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/jobs" className="flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <p className="font-medium text-sm">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.client}</p>
                    <p className="text-xs text-muted-foreground">{job.bids} bids · {job.posted}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-sm font-semibold">{job.budget}</p>
                    {getJobStatusBadge(job.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Recent Users
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/users" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-medium text-sm">{user.name}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="capitalize">{user.type}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      {getUserStatusBadge(user.status)}
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-muted-foreground">{user.joinedDate}</p>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminDashboard;
