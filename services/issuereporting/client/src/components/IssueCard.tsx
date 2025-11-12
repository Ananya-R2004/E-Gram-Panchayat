import { Issue, IssueCategory } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Zap,
  Lightbulb,
  Droplets,
  Construction,
  Trash2,
  Waves,
  Building2,
  HelpCircle,
  Clock,
  MapPin,
  User
} from "lucide-react";

// Map of issue categories to their corresponding icons
const categoryIcons: Record<IssueCategory, typeof Zap> = {
  electricity: Zap,
  street_lights: Lightbulb,
  water_supply: Droplets,
  roads: Construction,
  sanitation: Trash2,
  drainage: Waves,
  public_property: Building2,
  other: HelpCircle,
};

// Labels for issue categories
const categoryLabels: Record<IssueCategory, string> = {
  electricity: "Electricity",
  street_lights: "Street Lights",
  water_supply: "Water Supply",
  roads: "Roads",
  sanitation: "Sanitation",
  drainage: "Drainage",
  public_property: "Public Property",
  other: "Other",
};

// Status labels
const statusLabels = {
  pending: "Pending",
  in_progress: "In Progress",
  resolved: "Resolved",
  rejected: "Rejected",
};

// Status color styles
const statusColors = {
  pending: "bg-destructive text-destructive-foreground",
  in_progress: "bg-chart-2 text-white",
  resolved: "bg-primary text-primary-foreground",
  rejected: "bg-muted text-muted-foreground",
};

interface IssueCardProps {
  issue: Issue;
  onViewDetails?: (issue: Issue) => void;
  onClick?: (issue: Issue) => void;
}

export function IssueCard({ issue, onViewDetails, onClick }: IssueCardProps) {
  const CategoryIcon = categoryIcons[issue.category as IssueCategory] || HelpCircle;

  // Safely handle ID and Date
  const shortId = issue.id ? `#${issue.id.substring(0, 8)}` : "#N/A";
  const formattedDate = issue.createdAt
    ? format(new Date(issue.createdAt), "MMM dd, yyyy 'at' hh:mm a")
    : "Unknown date";

  return (
    <Card
      className="hover-elevate overflow-visible cursor-pointer"
      onClick={() => onClick?.(issue)}
      data-testid={`card-issue-${issue.id}`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-2 rounded-md bg-primary/10 shrink-0">
              <CategoryIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h3
                className="font-semibold text-base line-clamp-1"
                data-testid={`text-issue-title-${issue.id}`}
              >
                {issue.title || "Untitled Issue"}
              </h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {categoryLabels[issue.category as IssueCategory] || "Uncategorized"}
              </p>
            </div>
          </div>
          <Badge
            className={`${statusColors[issue.status as keyof typeof statusColors] || "bg-muted text-muted-foreground"} shrink-0 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide`}
            data-testid={`badge-status-${issue.id}`}
          >
            {statusLabels[issue.status as keyof typeof statusLabels] || "Unknown"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-4 space-y-3">
        <p
          className="text-sm line-clamp-2 text-foreground"
          data-testid={`text-description-${issue.id}`}
        >
          {issue.description || "No description available."}
        </p>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="line-clamp-1" data-testid={`text-location-${issue.id}`}>
              {issue.location || "No location specified"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="w-3.5 h-3.5 shrink-0" />
            <span data-testid={`text-submittedby-${issue.id}`}>
              {issue.submittedBy || "Anonymous"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span data-testid={`text-date-${issue.id}`}>{formattedDate}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between gap-2">
        <span
          className="text-xs text-muted-foreground font-mono"
          data-testid={`text-id-${issue.id}`}
        >
          {shortId}
        </span>

        {onViewDetails && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(issue);
            }}
            data-testid={`button-view-details-${issue.id}`}
          >
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
