"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Container,
} from "@mui/material";
import AppShell from "@/components/AppShell";
import HistoryMonthlyCard from "@/components/HistoryMonthlyCard";
import HistoryWeeklyCard from "@/components/HistoryWeeklyCard";
import RequireAuth from "@/components/RequireAuth";
import { historyEntriesMock } from "@/data/mockData";
import { getStoredHistory } from "@/lib/checkinStorage";
import type { HistoryEntry } from "@/types/history";
import { isMonthlyEntry, isWeeklyEntry } from "@/types/history";

type LogTab = "all" | "weekly" | "monthly";
type SortOrder = "newest" | "oldest";

function mergeHistory(
  stored: HistoryEntry[],
  seed: HistoryEntry[]
): HistoryEntry[] {
  const map = new Map<string, HistoryEntry>();
  for (const e of seed) {
    map.set(e.id, e);
  }
  for (const e of stored) {
    map.set(e.id, e);
  }
  return Array.from(map.values());
}

export default function HistoryLogsPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>(historyEntriesMock);
  const [tab, setTab] = useState<LogTab>("all");
  const [sort, setSort] = useState<SortOrder>("newest");

  /* eslint-disable react-hooks/set-state-in-effect -- merge persisted history after mount (SSR-safe) */
  useLayoutEffect(() => {
    setEntries(mergeHistory(getStoredHistory(), historyEntriesMock));
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const filtered = useMemo(() => {
    let list = entries;
    if (tab === "weekly") {
      list = list.filter(isWeeklyEntry);
    } else if (tab === "monthly") {
      list = list.filter(isMonthlyEntry);
    }
    const dir = sort === "newest" ? -1 : 1;
    return [...list].sort((a, b) => dir * a.dateSort.localeCompare(b.dateSort));
  }, [entries, tab, sort]);

  return (
    <RequireAuth>
      <AppShell>
        <Container maxWidth="md">
          <Typography variant="h5">History Logs</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Review your past check-ins to identify patterns over time.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              mb: 2.5,
              alignItems: { xs: "stretch", sm: "center" },
              justifyContent: "space-between",
              flexWrap: { sm: "nowrap" },
              minHeight: { sm: 48 },
            }}
          >
            <ToggleButtonGroup
              exclusive
              value={tab}
              onChange={(_, v: LogTab | null) => v && setTab(v)}
              sx={{
                flexShrink: 0,
                "& .MuiToggleButton-root": {
                  px: 2,
                  textTransform: "none",
                  fontWeight: 600,
                },
              }}
            >
              <ToggleButton value="all">All Logs</ToggleButton>
              <ToggleButton value="weekly">Weekly</ToggleButton>
              <ToggleButton value="monthly">Monthly</ToggleButton>
            </ToggleButtonGroup>

            <FormControl size="small" sx={{ minWidth: 200, flexShrink: 0 }}>
              <InputLabel id="sort-label">Sort</InputLabel>
              <Select
                labelId="sort-label"
                label="Sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOrder)}
              >
                <MenuItem value="newest">Newest first</MenuItem>
                <MenuItem value="oldest">Oldest first</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack spacing={2}>
            {filtered.length === 0 ? (
              <Box sx={{ py: 4, textAlign: "center", color: "text.secondary" }}>
                No entries yet.
              </Box>
            ) : (
              filtered.map((entry) =>
                isWeeklyEntry(entry) ? (
                  <HistoryWeeklyCard key={entry.id} entry={entry} />
                ) : (
                  <HistoryMonthlyCard key={entry.id} entry={entry} />
                )
              )
            )}
          </Stack>
        </Container>
      </AppShell>
    </RequireAuth>
  );
}
