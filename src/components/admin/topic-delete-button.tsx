"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteTopic } from "@/lib/topic-actions";

interface TopicDeleteButtonProps {
  topicId: string;
  topicName: string;
  subtopicCount?: number;
}

export function TopicDeleteButton({
  topicId,
  topicName,
  subtopicCount = 0,
}: TopicDeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const warning =
      subtopicCount > 0
        ? `Sigurado ka bang nais mong tanggalin ang paksang "${topicName}"?\n\nBabala: Mayroong ${subtopicCount} aralin na nakatala sa ilalim ng paksang ito. Kapag itinuloy, matatanggal din ang mga kaugnay na aralin.`
        : `Sigurado ka bang nais mong tanggalin ang paksang "${topicName}"? Hindi na ito maibabalik.`;

    if (!window.confirm(warning)) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await deleteTopic(topicId);
      if (res?.error) {
        alert(res.error);
      } else {
        router.refresh();
      }
    } catch (err: any) {
      alert(err?.message || "Nagkaroon ng aberya sa pagtanggal ng paksa.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      title={`Tanggalin ang paksang ${topicName}`}
      aria-label={`Tanggalin ang paksang ${topicName}`}
      className="p-1.5 rounded border border-[var(--color-border)] hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-950/40 dark:hover:border-red-800 text-red-600 dark:text-red-400 transition-colors disabled:opacity-50 cursor-pointer inline-flex items-center justify-center"
    >
      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
    </button>
  );
}
