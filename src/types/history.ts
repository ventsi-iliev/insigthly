export type WeeklyHistoryEntry = {
  kind: "weekly";
  id: string;
  date: string;
  dateSort: string;
  workload: number;
  stressInverted: number;
  support: number;
  satisfaction: number;
  overall: number;
  reflections: string;
};

export type MonthlyHistoryEntry = {
  kind: "monthly";
  id: string;
  date: string;
  dateSort: string;
  wentWell: string;
  challenges: string;
  learnings: string;
};

export type HistoryEntry = WeeklyHistoryEntry | MonthlyHistoryEntry;

export function isWeeklyEntry(e: HistoryEntry): e is WeeklyHistoryEntry {
  return e.kind === "weekly";
}

export function isMonthlyEntry(e: HistoryEntry): e is MonthlyHistoryEntry {
  return e.kind === "monthly";
}
