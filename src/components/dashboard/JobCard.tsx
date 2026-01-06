import { Clock, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/authContext";
interface JobCardProps {
  id: string;
  title: string;
  company: string;
  budget: string;
  deadline: string;
  bidsCount: number;
  tags: string[];
  status: "open" | "in-progress" | "closed";
  onViewDetails?: () => void; 
  footer?: JSX.Element;
}

export function JobCard({ 
  id,
  title,
  company, 
  budget, 
  deadline, 
  bidsCount, 
  tags, 
  status }: JobCardProps) {
  const {user} = useAuth( )
  const statusStyles = {
    open: "bg-success/10 text-success border-success/20",
    "in-progress": "bg-warning/10 text-warning border-warning/20",
    closed: "bg-muted text-muted-foreground border-border",
  };

  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-200 hover:shadow-elevated animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[status]}`}>
              {status.replace("-", " ")}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{company}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <DollarSign className="h-4 w-4" />
          <span className="font-medium text-foreground">{budget}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{deadline}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          <span>{bidsCount} bids</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to={`/jobs/${id}`} className="w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            Visa detaljer
          </Button>
        </Link>
        {user?.role === "freelancer" && status === "open" && (
          <Button size="sm" className="w-full sm:w-auto">
            Place Bid
          </Button>
        )}
      </div>
    </div>
  );
}
