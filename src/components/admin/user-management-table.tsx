"use client";

import React, { useState, useTransition } from "react";
import {
  Users,
  ShieldAlert,
  UserCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Edit3,
  BookOpen,
} from "lucide-react";
import { updateUserRole, type UserProfileItem } from "@/lib/user-actions";

interface UserManagementTableProps {
  initialUsers: UserProfileItem[];
  currentUserId: string | null;
}

export function UserManagementTable({
  initialUsers,
  currentUserId,
}: UserManagementTableProps) {
  const [users, setUsers] = useState<UserProfileItem[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("all");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [isPending, startTransition] = useTransition();
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  // Filtered users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.full_name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedRoleFilter === "all") return true;
    if (selectedRoleFilter === "admin") return u.role === "admin";
    if (selectedRoleFilter === "editor") return u.role === "editor";
    if (selectedRoleFilter === "viewer")
      return u.role === "viewer" || u.role === "user";

    return true;
  });

  // Calculate stats
  const totalCount = users.length;
  const adminCount = users.filter((u) => u.role === "admin").length;
  const editorCount = users.filter((u) => u.role === "editor").length;
  const viewerCount = users.filter(
    (u) => u.role === "viewer" || u.role === "user"
  ).length;

  const handleRoleChange = (
    userId: string,
    newRole: "admin" | "editor" | "viewer"
  ) => {
    setUpdatingUserId(userId);
    setFeedback(null);

    startTransition(async () => {
      const res = await updateUserRole(userId, newRole);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
        setFeedback({
          type: "success",
          message: res.message || "Matagumpay na nabago ang tungkulin.",
        });
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Nabigo sa pagbabago ng tungkulin.",
        });
      }
      setUpdatingUserId(null);
    });
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("fil-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner & Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="p-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
            <span>KABUUANG GUMAGAMIT</span>
            <Users className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[var(--color-text)]">
            {totalCount}
          </div>
          <div className="text-[11px] text-[var(--color-text-muted)]">
            Rehistradong mamamayan sa plataporma
          </div>
        </div>

        {/* Viewers */}
        <div className="p-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
            <span>MGA MAMBABASA</span>
            <BookOpen className="w-4 h-4 text-[#0D7B48]" />
          </div>
          <div className="text-2xl font-bold font-serif text-[var(--color-text)]">
            {viewerCount}
          </div>
          <div className="text-[11px] text-[var(--color-text-muted)]">
            Mambabasa at mag-aaral (Viewers)
          </div>
        </div>

        {/* Editors */}
        <div className="p-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
            <span>MGA EDITOR</span>
            <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-serif text-[var(--color-text)]">
            {editorCount}
          </div>
          <div className="text-[11px] text-[var(--color-text-muted)]">
            Mga manunulat at katuwang na patnugot
          </div>
        </div>

        {/* Admins */}
        <div className="p-4 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
            <span>PUNONG PATNUGOT</span>
            <Shield className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
          <div className="text-2xl font-bold font-serif text-[var(--color-text)]">
            {adminCount}
          </div>
          <div className="text-[11px] text-[var(--color-text-muted)]">
            May ganap na kontrol sa Tanggapan
          </div>
        </div>
      </div>

      {/* 2. Feedback Notification Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-md border flex items-start gap-3 text-xs sm:text-sm transition-all ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 font-medium">{feedback.message}</div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs opacity-70 hover:opacity-100"
          >
            Isara
          </button>
        </div>
      )}

      {/* 3. Search Bar and Filter Tabs */}
      <div className="p-4 sm:p-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-muted)]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Maghanap ayon sa pangalan o email..."
            className="w-full h-10 pl-9 pr-3 rounded-md border border-[var(--color-input-border)] bg-[var(--color-page)] text-xs sm:text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          <button
            type="button"
            onClick={() => setSelectedRoleFilter("all")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedRoleFilter === "all"
                ? "bg-[var(--color-primary)] text-white"
                : "border border-[var(--color-border)] bg-[var(--color-page)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Lahat ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => setSelectedRoleFilter("viewer")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedRoleFilter === "viewer"
                ? "bg-[var(--color-primary)] text-white"
                : "border border-[var(--color-border)] bg-[var(--color-page)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Mambabasa ({viewerCount})
          </button>
          <button
            type="button"
            onClick={() => setSelectedRoleFilter("editor")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedRoleFilter === "editor"
                ? "bg-blue-600 text-white"
                : "border border-[var(--color-border)] bg-[var(--color-page)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Editor ({editorCount})
          </button>
          <button
            type="button"
            onClick={() => setSelectedRoleFilter("admin")}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              selectedRoleFilter === "admin"
                ? "bg-red-600 text-white"
                : "border border-[var(--color-border)] bg-[var(--color-page)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Admin ({adminCount})
          </button>
        </div>
      </div>

      {/* 4. Users Table */}
      <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-page)] text-[11px] font-mono font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                <th className="py-3 px-4 sm:px-6">Pangalan at Email</th>
                <th className="py-3 px-4">Kasalukuyang Tungkulin</th>
                <th className="py-3 px-4">Petsa ng Pagkarehistro</th>
                <th className="py-3 px-4 sm:px-6 text-right">Pagpapatnugot (Aksyon)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-[var(--color-text-muted)]">
                    Walang natagpuang gumagamit sa pamantayang hinahanap.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isSelf = u.id === currentUserId;
                  const isUpdating = updatingUserId === u.id;

                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-[var(--color-page)]/50 transition-colors"
                    >
                      {/* Name & Email */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase text-white shrink-0 ${
                              u.role === "admin"
                                ? "bg-red-600"
                                : u.role === "editor"
                                ? "bg-blue-600"
                                : "bg-[#0D7B48]"
                            }`}
                          >
                            {u.full_name
                              ? u.full_name.charAt(0)
                              : u.email.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-[var(--color-text)] flex items-center gap-1.5 truncate">
                              <span>{u.full_name || "Walang Pangalan"}</span>
                              {isSelf && (
                                <span className="inline-block px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-mono font-bold">
                                  Iyong Account
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[var(--color-text-muted)] font-mono truncate">
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Current Role Badge */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono font-semibold uppercase tracking-wider ${
                            u.role === "admin"
                              ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30"
                              : u.role === "editor"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                              : "bg-[#0D7B48]/10 text-[#0D7B48] border border-[#0D7B48]/30"
                          }`}
                        >
                          {u.role === "admin" && <Shield className="w-3 h-3" />}
                          {u.role === "editor" && <Edit3 className="w-3 h-3" />}
                          {u.role !== "admin" && u.role !== "editor" && (
                            <UserCheck className="w-3 h-3" />
                          )}
                          <span>
                            {u.role === "admin"
                              ? "Admin / Patnugot"
                              : u.role === "editor"
                              ? "Editor"
                              : "Mambabasa"}
                          </span>
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-[var(--color-text-muted)] font-mono text-[11px]">
                        {formatDate(u.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                        {isSelf ? (
                          <span className="text-[11px] text-[var(--color-text-muted)] italic">
                            Kasalukuyang Naka-login
                          </span>
                        ) : isUpdating ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[var(--color-primary)]">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Ina-update...</span>
                          </span>
                        ) : (
                          <div className="inline-flex items-center gap-1.5">
                            {/* Option: Promote to Editor */}
                            {u.role !== "editor" && (
                              <button
                                type="button"
                                disabled={isPending}
                                onClick={() => handleRoleChange(u.id, "editor")}
                                className="px-2.5 py-1.5 rounded border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:bg-blue-500/20 text-[11px] font-semibold transition-colors cursor-pointer"
                                title="Italaga bilang Editor ng Nilalaman"
                              >
                                Gawing Editor
                              </button>
                            )}

                            {/* Option: Demote to Viewer */}
                            {u.role !== "viewer" && u.role !== "user" && (
                              <button
                                type="button"
                                disabled={isPending}
                                onClick={() => handleRoleChange(u.id, "viewer")}
                                className="px-2.5 py-1.5 rounded border border-border bg-[var(--color-page)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-accent text-[11px] font-semibold transition-colors cursor-pointer"
                                title="Ibalik sa karaniwang Mambabasa"
                              >
                                Ibalik sa Mambabasa
                              </button>
                            )}

                            {/* Option: Promote to Admin */}
                            {u.role !== "admin" && (
                              <button
                                type="button"
                                disabled={isPending}
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `Nais mo bang gawing Tagapangasiwa (Admin) si ${
                                        u.full_name || u.email
                                      }? Magkakaroon siya ng ganap na kontrol sa Tanggapan.`
                                    )
                                  ) {
                                    handleRoleChange(u.id, "admin");
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300 hover:bg-red-500/20 text-[11px] font-semibold transition-colors cursor-pointer"
                                title="Gawing Punong Patnugot (Admin)"
                              >
                                Gawing Admin
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
