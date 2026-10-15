import React, { Suspense } from "react";
import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Mag-login | Diwang Panlipunan",
  description: "Mag-login sa Diwang Panlipunan upang ma-access ang mga talataan, aralin, at makapagbahagi ng tugon.",
};

export default function LoginPage() {
  return (
    <div className="w-full min-h-[calc(100vh-16rem)] flex items-center justify-center py-6">
      <Suspense fallback={<div className="p-8 text-center text-sm text-text-muted">Ikinakarga ang pahina ng pag-login...</div>}>
        <AuthCard initialTab="login" />
      </Suspense>
    </div>
  );
}
