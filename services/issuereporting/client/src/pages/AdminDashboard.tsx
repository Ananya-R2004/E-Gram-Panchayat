import React, { useEffect, useState } from "react";
import { Issue } from "@shared/schema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

/**
 * AdminDashboard
 *
 * Shows a password modal on load. Verifies via POST /api/admin/verify.
 * After successful verification it loads and shows the dashboard.
 *
 * Notes:
 * - Backend route must exist at POST /api/admin/verify (you already added it).
 * - ADMIN_SECRET must be set in server .env.
 * - Vite proxy (or direct URL) should forward /api to your backend.
 */

export default function AdminDashboard() {
  // data + loading states for issues
  const [issues, setIssues] = useState<Issue[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | Issue["status"]>("all");
  const [loadingIssues, setLoadingIssues] = useState(false);

  // auth modal state
  const [showAuthModal, setShowAuthModal] = useState(true); // show on load
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);

  // When authorized becomes true, fetch issues
  useEffect(() => {
    if (!authorized) return;
    fetchIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized]);

  async function fetchIssues() {
    setLoadingIssues(true);
    try {
      // use relative path so Vite proxy (if present) forwards to backend
      const res = await fetch("/api/issues", { credentials: "include" });
      // backend in this project returns array directly, or you may return { success, issues } - we handle both
      const data = await res.json().catch(() => null);

      // handle both formats:
      if (data == null) {
        // if no JSON (unlikely) – fallback to empty
        setIssues([]);
      } else if (Array.isArray(data)) {
        setIssues(data);
      } else if (data.issues && Array.isArray(data.issues)) {
        setIssues(data.issues);
      } else {
        // maybe the server returned a single object, fallback empty
        setIssues([]);
        console.warn("Unexpected /api/issues response:", data);
      }
    } catch (err) {
      console.error("Failed to fetch issues:", err);
    } finally {
      setLoadingIssues(false);
    }
  }

  // verify admin code against backend
  async function handleVerify(e?: React.FormEvent) {
    e?.preventDefault();
    setVerifying(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include",
      });

      // parse json if any
      const data = await res.json().catch(() => null);

      if (res.ok && data && data.success) {
        setAuthorized(true);
        setShowAuthModal(false);
        setAuthError(null);
      } else {
        const errMsg = (data && data.error) || (res.statusText || "Invalid code");
        setAuthError(String(errMsg));
      }
    } catch (err) {
      console.error("Verification error:", err);
      setAuthError("Network error while verifying the code.");
    } finally {
      setVerifying(false);
      setCode(""); // clear input for safety
    }
  }

  // update status (PATCH). Uses same status strings from shared/schema (pending, in_progress...)
  async function handleStatusUpdate(id: string, status: Issue["status"]) {
    try {
      const res = await fetch(`/api/issues/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      });

      const data = await res.json().catch(() => null);

      // If backend returns updated issue, patch local state
      if (res.ok && data) {
        const updated = data.issue ?? data; // try both shapes
        if (updated && updated.id) {
          setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, status: updated.status } : i)));
          return;
        }
      }

      // otherwise fallback to optimistic local update
      setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  }

  // filtered issues for the current tab
  const filteredIssues =
    activeTab === "all" ? issues : issues.filter((issue) => issue.status === activeTab);

  // Badge variant mapping (match your UI Badge variants)
  const getBadgeVariant = (status: Issue["status"]): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "resolved":
        return "default";
      case "in_progress":
        return "outline";
      case "rejected":
        return "destructive";
      case "pending":
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-6">
      {/* Auth modal (small centered popup) */}
      {showAuthModal && !authorized && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form
            onSubmit={handleVerify}
            className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6"
            aria-labelledby="admin-modal-title"
          >
            <h3 id="admin-modal-title" className="text-lg font-medium mb-2">
              Admin Access
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enter the admin password to view the admin dashboard.
            </p>

            <label className="block mb-3">
              <span className="text-sm">Password</span>
              <Input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
                className="mt-2"
              />
            </label>

            {authError && <p className="text-sm text-red-600 mb-3">{authError}</p>}

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAuthModal(false);
                  setAuthError(null);
                }}
                type="button"
              >
                Cancel
              </Button>

              <Button type="submit" disabled={verifying || code.trim() === ""}>
                {verifying ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* If not authorized and modal closed, show a small info & provide button to reopen modal */}
      {!authorized && !showAuthModal && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground inline-block mr-3">
            Admin access required to view this page.
          </p>
          <Button onClick={() => setShowAuthModal(true)}>Open Admin Login</Button>
        </div>
      )}

      {/* Admin Dashboard content (only visible after success) */}
      {authorized ? (
        <>
          <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent key="issues-tab" value={activeTab} className="mt-6 space-y-4">
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <Card key={issue.id} className="shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{issue.title}</span>
                        <Badge variant={getBadgeVariant(issue.status)}>
                          {issue.status.replace("_", " ")}
                        </Badge>
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                      <p className="text-xs text-gray-500">
                        Submitted on: {format(new Date(issue.createdAt), "PPP")}
                      </p>
                      {issue.category && (
                        <p className="text-xs mt-1">
                          Category: <strong>{issue.category}</strong>
                        </p>
                      )}

                      <div className="mt-3 flex gap-2 flex-wrap">
                        {issue.status !== "in_progress" && (
                          <Button variant="outline" onClick={() => handleStatusUpdate(issue.id, "in_progress")}>
                            Mark In Progress
                          </Button>
                        )}
                        {issue.status !== "resolved" && (
                          <Button variant="default" onClick={() => handleStatusUpdate(issue.id, "resolved")}>
                            Mark Resolved
                          </Button>
                        )}
                        {issue.status !== "rejected" && (
                          <Button variant="destructive" onClick={() => handleStatusUpdate(issue.id, "rejected")}>
                            Reject
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center text-gray-500 mt-6">No issues found for this category.</div>
              )}
            </TabsContent>
          </Tabs>
        </>
      ) : null}
    </div>
  );
}
