import dayjs from "dayjs";
import type { HistoryEntry, MonthlyHistoryEntry, WeeklyHistoryEntry } from "@/types/history";

const HISTORY_KEY = "insightly_checkin_history";
const LEGACY_HISTORY_KEY = "zenflow_checkin_history";

const WEEKLY_DRAFT_KEY = "insightly_weekly_draft";
const MONTHLY_DRAFT_KEY = "insightly_monthly_draft";

export type WeeklyDraft = {
  date: string;
  scores: {
    workload: number;
    stressInverted: number;
    support: number;
    satisfaction: number;
  };
  reflections: string;
};

export type MonthlyDraft = {
  date: string;
  wentWell: string;
  challenges: string;
  learnings: string;
};

type LegacyStored = {
  id: string;
  date: string;
  workload: number;
  stressInverted: number;
  support: number;
  satisfaction: number;
  overall: number;
  reflections: string;
};

function dateToSortKey(displayDate: string): string {
  const parsed = dayjs(displayDate, "dddd, MMMM D, YYYY");
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD");
}

function legacyToWeekly(row: LegacyStored): WeeklyHistoryEntry {
  return {
    kind: "weekly",
    id: row.id,
    date: row.date,
    dateSort: dateToSortKey(row.date),
    workload: row.workload,
    stressInverted: row.stressInverted,
    support: row.support,
    satisfaction: row.satisfaction,
    overall: row.overall,
    reflections: row.reflections,
  };
}

function parseStoredRow(raw: unknown): HistoryEntry | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const r = raw as Record<string, unknown>;
  if (r.kind === "weekly") {
    return r as WeeklyHistoryEntry;
  }
  if (r.kind === "monthly") {
    return r as MonthlyHistoryEntry;
  }
  if ("workload" in r && "reflections" in r) {
    return legacyToWeekly(raw as LegacyStored);
  }
  return null;
}

function loadAll(): HistoryEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  const read = (key: string): HistoryEntry[] => {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return [];
    }
    try {
      const parsed = JSON.parse(raw) as unknown[];
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.map(parseStoredRow).filter((e): e is HistoryEntry => e !== null);
    } catch {
      return [];
    }
  };

  let entries = read(HISTORY_KEY);
  if (entries.length === 0) {
    const legacy = read(LEGACY_HISTORY_KEY);
    if (legacy.length > 0) {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(legacy));
      entries = legacy;
    }
  }

  return entries;
}

function saveAll(entries: HistoryEntry[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
}

export function getStoredHistory(): HistoryEntry[] {
  return loadAll();
}

export function getWeeklyDraft(): WeeklyDraft | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(WEEKLY_DRAFT_KEY);
    return raw ? (JSON.parse(raw) as WeeklyDraft) : null;
  } catch {
    return null;
  }
}

export function saveWeeklyDraft(draft: WeeklyDraft) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(WEEKLY_DRAFT_KEY, JSON.stringify(draft));
}

export function getMonthlyDraft(): MonthlyDraft | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(MONTHLY_DRAFT_KEY);
    return raw ? (JSON.parse(raw) as MonthlyDraft) : null;
  } catch {
    return null;
  }
}

export function saveMonthlyDraft(draft: MonthlyDraft) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(MONTHLY_DRAFT_KEY, JSON.stringify(draft));
}

export function appendWeeklyRecord(draft: WeeklyDraft) {
  const displayDate = dayjs(draft.date).format("dddd, MMMM D, YYYY");
  const overall = Number(
    (
      (draft.scores.workload +
        draft.scores.stressInverted +
        draft.scores.support +
        draft.scores.satisfaction) /
      4
    ).toFixed(1),
  );

  const newRecord: WeeklyHistoryEntry = {
    kind: "weekly",
    id: `weekly-${draft.date}-${Date.now()}`,
    date: displayDate,
    dateSort: draft.date,
    workload: draft.scores.workload,
    stressInverted: draft.scores.stressInverted,
    support: draft.scores.support,
    satisfaction: draft.scores.satisfaction,
    overall,
    reflections: draft.reflections.trim() || "No reflections added.",
  };

  saveAll([newRecord, ...loadAll()]);
}

export function appendMonthlyRecord(draft: MonthlyDraft) {
  const displayDate = dayjs(draft.date).format("dddd, MMMM D, YYYY");
  const newRecord: MonthlyHistoryEntry = {
    kind: "monthly",
    id: `monthly-${draft.date}-${Date.now()}`,
    date: displayDate,
    dateSort: draft.date,
    wentWell: draft.wentWell.trim(),
    challenges: draft.challenges.trim(),
    learnings: draft.learnings.trim(),
  };

  saveAll([newRecord, ...loadAll()]);
}
