import type { HistoryEntry } from "@/types/history";

export type TrendPoint = {
  month: string;
  overall: number;
  workload: number;
  stressInverted: number;
  support: number;
};

export type TeamMember = {
  name: string;
  role: string;
  avatarUrl: string;
  stressText: string;
  stressScore: string;
  status: "high" | "moderate" | "low";
  lastCheckIn: string;
  actionLabel: string;
};

/** Team Members directory page — pill tones match wellbeing / stress severity. */
export type TeamDirectoryBadgeTone = "danger" | "success" | "warning";

export type TeamDirectoryMember = {
  name: string;
  role: string;
  /** Portrait photo (remote URL allowed via `next.config` `images.remotePatterns`). */
  avatarUrl: string;
  wellbeingLabel: string;
  wellbeingTone: TeamDirectoryBadgeTone;
  stressLabel: string;
  stressTone: TeamDirectoryBadgeTone;
  updatedAt: string;
};

export const teamDirectoryMembers: TeamDirectoryMember[] = [
  {
    name: "Elena Dimitrova",
    role: "Frontend Developer",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    wellbeingLabel: "2.5/5",
    wellbeingTone: "danger",
    stressLabel: "High",
    stressTone: "danger",
    updatedAt: "Updated 2 days ago",
  },
  {
    name: "Ivan Ivanov",
    role: "UX Designer",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    wellbeingLabel: "4.2/5",
    wellbeingTone: "success",
    stressLabel: "Low",
    stressTone: "success",
    updatedAt: "Updated 5 days ago",
  },
  {
    name: "Maria Georgieva",
    role: "Product Manager",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    wellbeingLabel: "1.8/5",
    wellbeingTone: "danger",
    stressLabel: "High",
    stressTone: "danger",
    updatedAt: "Updated 1 day ago",
  },
  {
    name: "Petar Petrov",
    role: "Backend Engineer",
    avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    wellbeingLabel: "3.5/5",
    wellbeingTone: "warning",
    stressLabel: "Moderate",
    stressTone: "warning",
    updatedAt: "Updated 1 week ago",
  },
];

export type WellbeingCardIcon = "medal" | "camera" | "shield" | "star";

export const wellbeingCards: {
  title: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: WellbeingCardIcon;
}[] = [
  { title: "Overall Wellbeing", value: "4.3", delta: "+1.0", positive: true, icon: "medal" },
  { title: "Workload Balance", value: "4/5", delta: "+1.0", positive: true, icon: "camera" },
  { title: "Management Support", value: "5/5", delta: "+1.0", positive: true, icon: "shield" },
  { title: "Job Satisfaction", value: "4/5", delta: "+1.0", positive: true, icon: "star" },
];

/** Same shape for all series; dashboard chart uses `overall` only. */
function trendRow(
  month: string,
  overall: number
): TrendPoint {
  return {
    month,
    overall,
    workload: overall,
    stressInverted: overall,
    support: overall,
  };
}

export const trendData: TrendPoint[] = [
  trendRow("Jan", 2.2),
  trendRow("Feb", 3.2),
  trendRow("Mar", 4.25),
  trendRow("Apr", 4.25),
  trendRow("May", 4.25),
  trendRow("Jun", 4.25),
  trendRow("Jul", 4.25),
  trendRow("Aug", 4.25),
  trendRow("Sep", 4.25),
  trendRow("Oct", 4.25),
  trendRow("Nov", 4.25),
  trendRow("Dec", 4.25),
];

export const teamMembers: TeamMember[] = [
  {
    name: "Maria Georgieva",
    role: "Product Manager",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    stressText: "High",
    stressScore: "(1/5)",
    status: "high",
    lastCheckIn: "1 day ago",
    actionLabel: "Schedule 1:1",
  },
  {
    name: "Elena Dimitrova",
    role: "Frontend Developer",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    stressText: "High",
    stressScore: "(1/5)",
    status: "high",
    lastCheckIn: "2 days ago",
    actionLabel: "Schedule 1:1",
  },
  {
    name: "Petar Petrov",
    role: "Backend Engineer",
    avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    stressText: "Moderate",
    stressScore: "(3/5)",
    status: "moderate",
    lastCheckIn: "1 week ago",
    actionLabel: "View Profile",
  },
  {
    name: "Ivan Ivanov",
    role: "UX Designer",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    stressText: "Low",
    stressScore: "(4/5)",
    status: "low",
    lastCheckIn: "5 days ago",
    actionLabel: "View Profile",
  },
];

/** Seed data for history (mixed weekly + monthly). */
export const historyEntriesMock: HistoryEntry[] = [
  {
    kind: "monthly",
    id: "mock-monthly-1",
    date: "Sunday, March 22, 2026",
    dateSort: "2026-03-22",
    wentWell: "Finished the main epic without major bugs. Team velocity was great.",
    challenges: "Too many ad-hoc meetings disrupted deep work time.",
    learnings: "I need to block out focus time on my calendar more aggressively.",
  },
  {
    kind: "weekly",
    id: "mock-weekly-1",
    date: "Sunday, March 22, 2026",
    dateSort: "2026-03-22",
    workload: 4,
    stressInverted: 4,
    support: 5,
    satisfaction: 4,
    overall: 4.3,
    reflections: "Good month! Project shipped successfully.",
  },
  {
    kind: "weekly",
    id: "mock-weekly-2",
    date: "Friday, February 20, 2026",
    dateSort: "2026-02-20",
    workload: 3,
    stressInverted: 3,
    support: 4,
    satisfaction: 3,
    overall: 3.3,
    reflections: "Getting better, manager helped prioritize tasks.",
  },
  {
    kind: "weekly",
    id: "mock-weekly-3",
    date: "Tuesday, April 21, 2026",
    dateSort: "2026-04-21",
    workload: 5,
    stressInverted: 5,
    support: 5,
    satisfaction: 3,
    overall: 4.5,
    reflections: "No notes provided for this month.",
  },
];
