import { Calendar, DollarSign, User } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  id: string;
  title: string;
  freelancer?: string;
  budget: string;
  deadline: string;
  proposalsCount: number;
  progress: number;
  status: "draft" | "open" | "in-progress" | "review" | "completed";
}

export const ProjectCard = ({
  title,
  freelancer,
  budget,
  deadline,
  proposalsCount,
  progress,
  status,
}: ProjectCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20">
      <CardContent className="p-5">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {title}
              </h3>
              {freelancer && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{freelancer}</span>
                </div>
              )}
            </div>

            <Badge
              variant="outline"
              className={cn(
                "capitalize whitespace-nowrap",
                status === "open" && "border-success text-success",
                status === "in-progress" && "border-primary text-primary",
                status === "review" && "border-warning text-warning",
                status === "completed" && "border-muted-foreground text-muted-foreground",
                status === "draft" && "border-muted-foreground/50 text-muted-foreground/50"
              )}
            >
              {status}
            </Badge>
          </div>

          {(status === "in-progress" || status === "review") && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4" />
              <span>{budget}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{deadline}</span>
            </div>
            {status === "open" && (
              <span className="text-primary font-medium">
                {proposalsCount} proposals
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-5 py-4 bg-muted/30 border-t">
        <Button className="w-full" variant={status === "open" ? "default" : "outline"}>
          {status === "open" ? "Review Proposals" : "View Project"}
        </Button>
      </CardFooter>
    </Card>
  );
};
