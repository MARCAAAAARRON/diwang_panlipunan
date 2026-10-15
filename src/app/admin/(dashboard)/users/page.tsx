import React from "react";
import type { Metadata } from "next";
import { getUsersList } from "@/lib/user-actions";
import { UserManagementTable } from "@/components/admin/user-management-table";
import { Users, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Pamamahala ng mga Gumagamit | Tanggapan ng Patnugot",
  description: "Italaga ang mga editor, patnugot, at mambabasa ng Diwang Panlipunan.",
};

export default async function AdminUsersPage() {
  const { users, currentUserId, error } = await getUsersList();

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-mono font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>PANGASIWAAN NG MGA MIYEMBRO</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text)]">
            Pamamahala ng mga Gumagamit at Editor
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-2xl">
            Tingnan ang lahat ng rehistradong mamamayan sa plataporma at magtalaga ng mga katuwang na patnugot (Editors) na may kakayahang magsulat at magbago ng mga aralin.
          </p>
        </div>
      </div>

      {error ? (
        <div className="p-6 rounded-md border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-bold">Walang Pahintulot o May Aberya</h2>
            <p className="text-xs">{error}</p>
          </div>
        </div>
      ) : (
        <UserManagementTable initialUsers={users} currentUserId={currentUserId} />
      )}
    </div>
  );
}
