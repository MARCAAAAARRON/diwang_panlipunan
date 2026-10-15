import React, { Suspense } from "react";
import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Mag-register | Diwang Panlipunan",
  description: "Lumikha ng account sa Diwang Panlipunan upang maging bahagi ng mapanuring komunidad ng mga mambabasa.",
};

export default function RegisterPage() {
  return (
    <div className="w-full min-h-[calc(100vh-16rem)] flex items-center justify-center py-6">
      <Suspense fallback={<div className="p-8 text-center text-sm text-text-muted">Ikinakarga ang pahina ng pagpaparehistro...</div>}>
        <AuthCard initialTab="register" />
      </Suspense>
    </div>
  );
}
