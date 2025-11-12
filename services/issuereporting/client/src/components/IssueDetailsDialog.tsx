import { Issue } from "@shared/schema";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { IssueForm } from "./IssueForm";

interface IssueDetailsDialogProps {
  issue: Issue | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IssueDetailsDialog({
  issue,
  open,
  onOpenChange,
}: IssueDetailsDialogProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/issues/${issue?.id}`);
    },
    onSuccess: () => {
      toast({
        title: "Issue Deleted",
        description: "Your issue has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/issues"] });
      onOpenChange(false);
    },
    onError: () => {
      toast({ title: "Delete Failed", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<Issue>) => {
      // ✅ Sanitize adminRemarks to be string or undefined
      const sanitizedData: Partial<Issue> = {
        ...data,
        adminRemarks:
          data.adminRemarks === null
            ? undefined
            : data.adminRemarks ?? undefined,
      };

      await apiRequest("PUT", `/api/issues/${issue?.id}`, sanitizedData);
    },
    onSuccess: () => {
      toast({
        title: "Issue Updated",
        description: "Your issue has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/issues"] });
      setIsEditing(false);
    },
    onError: () => {
      toast({ title: "Update Failed", variant: "destructive" });
    },
  });

  if (!issue) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{issue.title}</DialogTitle>
        </DialogHeader>

        {isEditing ? (
          <IssueForm
            defaultValues={{
              ...issue,
              adminRemarks: issue.adminRemarks ?? "",
            }}
            onSubmit={(data) => updateMutation.mutate(data)}
          />
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{issue.description}</p>
            <div>
              <Badge>{issue.category}</Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Submitted on {format(new Date(issue.createdAt), "PPP")}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 text-xs text-muted-foreground">
          <span>
            Issue ID: <span className="font-mono">#{issue.id}</span>
          </span>

          <div className="flex gap-2">
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1"
              >
                <Pencil className="w-4 h-4" /> Edit
              </Button>
            )}

            {isEditing ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            ) : (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteMutation.mutate()}
                className="flex items-center gap-1"
              >
                <Trash className="w-4 h-4" /> Delete
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
