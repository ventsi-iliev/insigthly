"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import AppShell from "@/components/AppShell";
import CheckinQuestion from "@/components/CheckinQuestion";
import RequireAuth from "@/components/RequireAuth";
import {
  appendWeeklyRecord,
  getWeeklyDraft,
  saveWeeklyDraft,
} from "@/lib/checkinStorage";

type Scores = {
  workload: number;
  stressInverted: number;
  support: number;
  satisfaction: number;
};

const defaultScores: Scores = {
  workload: 3,
  stressInverted: 3,
  support: 4,
  satisfaction: 3,
};

export default function WeeklyCheckInPage() {
  const [date, setDate] = useState(() => dayjs().format("YYYY-MM-DD"));
  const [saved, setSaved] = useState(false);
  const [scores, setScores] = useState<Scores>(defaultScores);
  const [reflections, setReflections] = useState("");

  /* eslint-disable react-hooks/set-state-in-effect -- hydrate draft from localStorage after mount (SSR-safe) */
  useLayoutEffect(() => {
    const draft = getWeeklyDraft();
    if (draft) {
      setDate(draft.date);
      setScores(draft.scores);
      setReflections(draft.reflections);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const overall = useMemo(
    () =>
      (
        (scores.workload +
          scores.stressInverted +
          scores.support +
          scores.satisfaction) /
        4
      ).toFixed(1),
    [scores]
  );

  function persistDraft(next: {
    date: string;
    scores: Scores;
    reflections: string;
  }) {
    saveWeeklyDraft({
      date: next.date,
      scores: next.scores,
      reflections: next.reflections,
    });
  }

  function handleDateChange(nextDate: string) {
    setSaved(false);
    setDate(nextDate);
    persistDraft({ date: nextDate, scores, reflections });
  }

  function handleScoreChange(update: Partial<Scores>) {
    setSaved(false);
    setScores((prev) => {
      const nextScores = { ...prev, ...update };
      persistDraft({ date, scores: nextScores, reflections });
      return nextScores;
    });
  }

  function handleSave() {
    const payload = { date, scores, reflections };
    saveWeeklyDraft(payload);
    appendWeeklyRecord(payload);
    setSaved(true);
  }

  return (
    <RequireAuth>
      <AppShell>
        <Container maxWidth="md">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
              mb: 2,
              justifyContent: "space-between",
              alignItems: { sm: "flex-start" },
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h4">Weekly Check-in</Typography>
              <Typography variant="body2">
                Take a moment to reflect on your week. How are you feeling about
                work and management?
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              sx={{
                alignSelf: { xs: "stretch", sm: "flex-start" },
                whiteSpace: "nowrap",
              }}
              onClick={() =>
                window.open(
                  `mailto:manager@company.com?subject=${encodeURIComponent(
                    "Request 1:1 meeting"
                  )}`,
                  "_blank"
                )
              }
            >
              Request 1:1 Meeting
            </Button>
          </Stack>

          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <CalendarMonthRoundedIcon sx={{ color: "primary.main" }} />
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>
                      Check-in Date
                    </Typography>
                    <Typography variant="body2">
                      Select the date for this entry.
                    </Typography>
                  </Box>
                </Stack>
                <TextField
                  type="date"
                  value={date}
                  onChange={(event) => handleDateChange(event.target.value)}
                  sx={{ minWidth: 180 }}
                />
              </Stack>
            </CardContent>
          </Card>

          <Stack spacing={2}>
            <CheckinQuestion
              title="Workload Balance"
              prompt="How manageable was your workload this week? 1=Overwhelming, 5=Perfectly balanced"
              value={scores.workload}
              onChange={(workload) => handleScoreChange({ workload })}
            />
            <CheckinQuestion
              title="Stress Level (Inverted)"
              prompt="How stressed did you feel? 1=Very High Stress, 5=Very Low Stress / Relaxed"
              value={scores.stressInverted}
              onChange={(stressInverted) =>
                handleScoreChange({ stressInverted })
              }
            />
            <CheckinQuestion
              title="Management Support"
              prompt="How supported did you feel by your manager this week?"
              value={scores.support}
              onChange={(support) => handleScoreChange({ support })}
            />
            <CheckinQuestion
              title="Job Satisfaction"
              prompt="How satisfied did you feel with your role and progress this week?"
              value={scores.satisfaction}
              onChange={(satisfaction) => handleScoreChange({ satisfaction })}
            />
            <Card>
              <CardContent sx={{ py: 2 }}>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>
                  Reflections (optional)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  placeholder="Anything else you want to note for this week…"
                  value={reflections}
                  onChange={(e) => {
                    setSaved(false);
                    const v = e.target.value;
                    setReflections(v);
                    persistDraft({ date, scores, reflections: v });
                  }}
                />
              </CardContent>
            </Card>
          </Stack>

          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              mt: 2.5,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              startIcon={<SaveRoundedIcon />}
              onClick={handleSave}
              size="large"
            >
              Save Check-in
            </Button>
            <Typography variant="body2">
              Overall score preview: {overall}/5
            </Typography>
          </Stack>

          {saved ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Weekly check-in saved to your history.
            </Alert>
          ) : null}
        </Container>
      </AppShell>
    </RequireAuth>
  );
}
