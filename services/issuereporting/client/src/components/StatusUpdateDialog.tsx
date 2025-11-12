import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateIssueStatusSchema, type UpdateIssueStatus, issueStatuses } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "rejected", label: "Rejected" },
];

interface StatusUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UpdateIssueStatus) => void;
  isPending?: boolean;
  currentStatus: string;
}

export function StatusUpdateDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  currentStatus,
}: StatusUpdateDialogProps) {
  const form = useForm<UpdateIssueStatus>({
    resolver: zodResolver(updateIssueStatusSchema),
    defaultValues: {
      status: currentStatus as any,
      adminRemarks: "",
    },
  });

  const handleSubmit = (data: UpdateIssueStatus) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-status-update">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Update Issue Status</DialogTitle>
          <DialogDescription className="text-sm">
            Change the status of this issue and add remarks for the villager.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">New Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-status">
                        <SelectValue placeholder="Select new status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="adminRemarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Admin Remarks (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any notes or updates for the villager"
                      className="min-h-24 resize-none"
                      {...field}
                      data-testid="input-remarks"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isPending}
                data-testid="button-update-status"
              >
                {isPending ? "Updating..." : "Update Status"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
