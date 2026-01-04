import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
 
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export const StatsCard = ({ title, value,  trend, className }: StatsCardProps) => {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {trend && (
              <div className="flex items-center gap-1">
                {trend.positive ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-destructive" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.positive ? "text-success" : "text-destructive"
                  )}
                >
                  {trend.value}
                </span>
              </div>
            )}
          </div>
          {/* <div className="p-3 rounded-xl bg-primary/10 text-primary">{icon}</div> */}
        </div>
      </CardContent>
    </Card>
  );
};
