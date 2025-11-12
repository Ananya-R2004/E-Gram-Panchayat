import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertIssueSchema, type InsertIssue, type Issue } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Zap,
  Lightbulb,
  Droplets,
  Construction,
  Trash2,
  Waves,
  Building2,
  HelpCircle,
} from "lucide-react";

// ✅ Category options with icons
const categoryOptions = [
  { value: "electricity", label: "Electricity Problem", icon: Zap },
  { value: "street_lights", label: "Street Lights", icon: Lightbulb },
  { value: "water_supply", label: "Water Supply", icon: Droplets },
  { value: "roads", label: "Road Repair", icon: Construction },
  { value: "sanitation", label: "Sanitation", icon: Trash2 },
  { value: "drainage", label: "Drainage", icon: Waves },
  { value: "public_property", label: "Public Property", icon: Building2 },
  { value: "other", label: "Other", icon: HelpCircle },
];

export interface IssueFormProps {
  onSubmit: (data: InsertIssue) => void;
  isPending?: boolean;
  defaultValues?: Partial<Issue>; // ✅ added to support editing
}

export function IssueForm({ onSubmit, isPending, defaultValues }: IssueFormProps) {
  const form = useForm<InsertIssue>({
    resolver: zodResolver(insertIssueSchema),
    defaultValues: {
      category: defaultValues?.category || "electricity",
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      location: defaultValues?.location || "",
      submittedBy: defaultValues?.submittedBy || "",
      contactNumber: defaultValues?.contactNumber || "",
      status: defaultValues?.status || "pending",
      adminRemarks: defaultValues?.adminRemarks ?? "", // ✅ null-safe
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
      >
        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Issue Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Issue Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Brief summary of the issue"
                  {...field}
                  data-testid="input-title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide detailed information about the issue"
                  className="min-h-32 resize-none"
                  {...field}
                  data-testid="input-description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Location / Area</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Near Temple, Main Road, Ward 3"
                  {...field}
                  data-testid="input-location"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submitted By */}
        <FormField
          control={form.control}
          name="submittedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Your Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your full name"
                  {...field}
                  data-testid="input-name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Number */}
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Contact Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your contact number"
                  {...field}
                  data-testid="input-contact"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full md:w-auto md:min-w-48"
            disabled={isPending}
            data-testid="button-submit-issue"
          >
            {isPending ? "Submitting..." : "Submit Issue"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
