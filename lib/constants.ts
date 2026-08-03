export const TIER_OPTIONS = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
  { value: "ultra", label: "Ultra" },
] as const;

export type Tier = (typeof TIER_OPTIONS)[number]["value"];

type TierColor = "emerald" | "amber" | "cyan";

const TIER_COLOR_MAP: Record<TierColor, { border: string; text: string }> = {
  emerald: {
    border: "border-emerald-500/20",
    text: "text-emerald-400",
  },
  amber: {
    border: "border-amber-500/30",
    text: "text-amber-400",
  },
  cyan: {
    border: "border-cyan-500/20",
    text: "text-cyan-400",
  },
};

export function getTierColorClasses(color: TierColor) {
  return TIER_COLOR_MAP[color];
}

// Tier styling constants for UI components
export const TIER_STYLES: Record<
  Tier,
  {
    gradient: string;
    border: string;
    text: string;
    badge: string;
  }
> = {
  free: {
    gradient: "from-emerald-500 to-teal-600",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    badge: "bg-emerald-500/90 text-white",
  },
  pro: {
    gradient: "from-amber-500 to-orange-600",
    border: "border-amber-500/30",
    text: "text-amber-400",
    badge: "bg-amber-500/90 text-white",
  },
  ultra: {
    gradient: "from-cyan-400 to-blue-600",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    badge: "bg-cyan-500/90 text-white",
  },
};

export const TIER_FEATURES = [
  {
    tier: "Free",
    color: "emerald",
    features: [
      "Access to foundational courses",
      "Community Discord access",
      "Basic projects & exercises",
      "Email support",
    ],
  },
  {
    tier: "Pro",
    color: "amber",
    features: [
      "Everything in Free",
      "All Pro-tier courses",
      "Advanced real-world projects",
      "Priority support",
      "Course completion certificates",
    ],
  },
  {
    tier: "Ultra",
    color: "cyan",
    features: [
      "Everything in Pro",
      "AI Learning Assistant",
      "Exclusive Ultra-only content",
      "Monthly 1-on-1 sessions",
      "Private Discord channel",
      "Early access to new courses",
      "Lifetime updates",
    ],
  },
] as const;
