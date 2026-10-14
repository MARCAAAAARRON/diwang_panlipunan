import React from "react";
import {
  GraduationCap,
  HeartPulse,
  TrendingUp,
  Scale,
  Leaf,
  Cpu,
  Landmark,
  BookOpen,
  type LucideProps,
} from "lucide-react";

interface TopicIconProps extends LucideProps {
  name: string;
}

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  GraduationCap,
  HeartPulse,
  TrendingUp,
  Scale,
  Leaf,
  Cpu,
  Landmark,
  BookOpen,
};

export function TopicIcon({ name, ...props }: TopicIconProps) {
  const IconComponent = ICON_MAP[name] || BookOpen;
  return <IconComponent {...props} />;
}
