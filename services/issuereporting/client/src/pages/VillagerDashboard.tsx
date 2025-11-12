import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Issue, InsertIssue } from "@shared/schema";
import { IssueCard } from "@/components/IssueCard";
import { IssueForm } from "@/components/IssueForm";
import { IssueDetailsDialog } from "@/components/IssueDetailsDialog";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Plus, FileText, CheckCircle2, Clock, XCircle } from "lucide-react";

export default function VillagerDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const { toast } = useToast();

  const { data: issues = [], isLoading } = useQuery<Issue[]>({
    queryKey: ["/api/issues"],
  });

  const createIssueMutation = useMutation({
    mutationFn: async (data: InsertIssue) => {
      return await apiRequest("POST", "/api/issues", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/issues"] });
      toast({
        title: "Issue Submitted",
        description: "Your issue has been successfully submitted to the admin.",
      });
      setShowForm(false);
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Failed to submit your issue. Please try again.",
        variant: "destructive",
      });
    },
  });

  const pendingIssues = issues.filter(issue => issue.status === "pending");
  const inProgressIssues = issues.filter(issue => issue.status === "in_progress");
  const resolvedIssues = issues.filter(issue => issue.status === "resolved");
  const rejectedIssues = issues.filter(issue => issue.status === "rejected");

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-32 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="container max-w-2xl mx-auto py-8 px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Report New Issue</CardTitle>
            <CardDescription>
              Submit your concerns and we'll address them as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IssueForm
              onSubmit={(data) => createIssueMutation.mutate(data)}
              isPending={createIssueMutation.isPending}
            />
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                data-testid="button-cancel-form"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-6">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">My Issues</h2>
            <p className="text-muted-foreground">
              Track and manage all your submitted issues
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto"
            data-testid="button-report-issue"
          >
            <Plus className="w-4 h-4 mr-2" />
            Report New Issue
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Issues</p>
                  <p className="text-3xl font-bold mt-2" data-testid="text-stats-total">{issues.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Pending</p>
                  <p className="text-3xl font-bold mt-2" data-testid="text-stats-pending">{pendingIssues.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-destructive/10">
                  <Clock className="w-6 h-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">In Progress</p>
                  <p className="text-3xl font-bold mt-2" data-testid="text-stats-in-progress">{inProgressIssues.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-chart-2/10">
                  <Clock className="w-6 h-6 text-chart-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Resolved</p>
                  <p className="text-3xl font-bold mt-2" data-testid="text-stats-resolved">{resolvedIssues.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8" data-testid="tabs-filter">
          <TabsTrigger value="all" data-testid="tab-all">All ({issues.length})</TabsTrigger>
          <TabsTrigger value="pending" data-testid="tab-pending">Pending ({pendingIssues.length})</TabsTrigger>
          <TabsTrigger value="in_progress" data-testid="tab-in-progress">In Progress ({inProgressIssues.length})</TabsTrigger>
          <TabsTrigger value="resolved" data-testid="tab-resolved">Resolved ({resolvedIssues.length})</TabsTrigger>
          <TabsTrigger value="rejected" data-testid="tab-rejected">Rejected ({rejectedIssues.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {issues.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No Issues Submitted Yet"
              description="Start by reporting your first issue to the administration"
              actionLabel="Report Issue"
              onAction={() => setShowForm(true)}
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {issues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onClick={(issue) => setSelectedIssue(issue)}
                  onViewDetails={(issue) => setSelectedIssue(issue)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending">
          {pendingIssues.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="No Pending Issues"
              description="You don't have any pending issues at the moment"
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pendingIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onClick={(issue) => setSelectedIssue(issue)}
                  onViewDetails={(issue) => setSelectedIssue(issue)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="in_progress">
          {inProgressIssues.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="No In Progress Issues"
              description="You don't have any issues being worked on at the moment"
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {inProgressIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onClick={(issue) => setSelectedIssue(issue)}
                  onViewDetails={(issue) => setSelectedIssue(issue)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="resolved">
          {resolvedIssues.length === 0 ? (
            <EmptyState
              icon={CheckCircle2}
              title="No Resolved Issues"
              description="You don't have any resolved issues yet"
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resolvedIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onClick={(issue) => setSelectedIssue(issue)}
                  onViewDetails={(issue) => setSelectedIssue(issue)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rejected">
          {rejectedIssues.length === 0 ? (
            <EmptyState
              icon={XCircle}
              title="No Rejected Issues"
              description="You don't have any rejected issues"
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rejectedIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onClick={(issue) => setSelectedIssue(issue)}
                  onViewDetails={(issue) => setSelectedIssue(issue)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <IssueDetailsDialog
        issue={selectedIssue}
        open={!!selectedIssue}
        onOpenChange={(open) => !open && setSelectedIssue(null)}
      />
    </div>
  );
}
