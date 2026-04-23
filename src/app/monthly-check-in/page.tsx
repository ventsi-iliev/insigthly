"use client";

import { useLayoutEffect, useState } from "react";
import dayjs from "dayjs";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
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
import RequireAuth from "@/components/RequireAuth";
import {
  appendMonthlyRecord,
  getMonthlyDraft,
  saveMonthlyDraft,
} from "@/lib/checkinStorage";

export default function MonthlyCheckInPage() {
  const [date, setDate] = useState(() => dayjs().format("YYYY-MM-DD"));
  const [wentWell, setWentWell] = useState("");
  const [challenges, setChallenges] = useState("");
  const [learnings, setLearnings] = useState("");
  const [saved, setSaved] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect -- hydrate draft from localStorage after mount (SSR-safe) */
  useLayoutEffect(() => {
    const draft = getMonthlyDraft();
    if (draft) {
      setDate(draft.date);
      setWentWell(draft.wentWell);
      setChallenges(draft.challenges);
      setLearnings(draft.learnings);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <RequireAuth>
      <AppShell>
        <Container size="md">
          <Typography variant="h5">Monthly Reflection</Typography>
          <Typography variant="body2" sx={{ mb: 2.5, maxWidth: 720 }}>
            Take a moment to deeply reflect on the past month. Your insights
            help improve your wellbeing and our team&apos;s processes.
          </Typography>

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
                      Select the date for this reflection.
                    </Typography>
                  </Box>
                </Stack>
                <TextField
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setSaved(false);
                    const v = e.target.value;
                    setDate(v);
                    saveMonthlyDraft({
                      date: v,
                      wentWell,
                      challenges,
                      learnings,
                    });
                  }}
                  sx={{ minWidth: 180 }}
                />
              </Stack>
            </CardContent>
          </Card>

          <Stack spacing={2}>
            <Card>
              <CardContent sx={{ py: 2.5 }}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ mb: 2, alignItems: "center" }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: "rgba(22, 101, 52, 0.1)",
                      display: "grid",
                      placeItems: "center",
                      color: "primary.main",
                    }}
                  >
                    <ThumbUpAltOutlinedIcon />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>
                      What went well this month?
                    </Typography>
                    <Typography variant="body2">
                      Highlight your achievements, positive interactions, and
                      moments you felt proud.
                    </Typography>
                  </Box>
                </Stack>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  placeholder="e.g., I successfully delivered the new feature ahead of schedule…"
                  value={wentWell}
                  onChange={(e) => {
                    setSaved(false);
                    const v = e.target.value;
                    setWentWell(v);
                    saveMonthlyDraft({
                      date,
                      wentWell: v,
                      challenges,
                      learnings,
                    });
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ py: 2.5 }}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ mb: 2, alignItems: "center" }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: "rgba(244, 63, 94, 0.12)",
                      display: "grid",
                      placeItems: "center",
                      color: "error.main",
                    }}
                  >
                    <ThumbDownAltOutlinedIcon />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>
                      What were the biggest challenges?
                    </Typography>
                    <Typography variant="body2">
                      Describe blockers, stressful situations, or processes that
                      didn&apos;t work well.
                    </Typography>
                  </Box>
                </Stack>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  placeholder="e.g., We had too many meetings which made it hard to find focus time…"
                  value={challenges}
                  onChange={(e) => {
                    setSaved(false);
                    const v = e.target.value;
                    setChallenges(v);
                    saveMonthlyDraft({
                      date,
                      wentWell,
                      challenges: v,
                      learnings,
                    });
                  }}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ py: 2.5 }}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ mb: 2, alignItems: "center" }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: "rgba(234, 179, 8, 0.2)",
                      display: "grid",
                      placeItems: "center",
                      color: "#ca8a04",
                    }}
                  >
                    <LightbulbOutlinedIcon />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>
                      What are your key learnings or suggestions?
                    </Typography>
                    <Typography variant="body2">
                      Share what you&apos;ve learned and how we could improve
                      things for next month.
                    </Typography>
                  </Box>
                </Stack>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  placeholder="e.g., I'd like to implement a 'no-meeting Wednesday' policy…"
                  value={learnings}
                  onChange={(e) => {
                    setSaved(false);
                    const v = e.target.value;
                    setLearnings(v);
                    saveMonthlyDraft({
                      date,
                      wentWell,
                      challenges,
                      learnings: v,
                    });
                  }}
                />
              </CardContent>
            </Card>
          </Stack>

          <Stack
            direction="row"
            spacing={1.5}
            sx={{ mt: 3, justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                setWentWell("");
                setChallenges("");
                setLearnings("");
                const today = dayjs().format("YYYY-MM-DD");
                setDate(today);
                saveMonthlyDraft({
                  date: today,
                  wentWell: "",
                  challenges: "",
                  learnings: "",
                });
                setSaved(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveRoundedIcon />}
              onClick={() => {
                const payload = { date, wentWell, challenges, learnings };
                saveMonthlyDraft(payload);
                appendMonthlyRecord(payload);
                setSaved(true);
              }}
              size="large"
            >
              Save Reflection
            </Button>
          </Stack>

          {saved ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Monthly reflection saved to your history.
            </Alert>
          ) : null}
        </Container>
      </AppShell>
    </RequireAuth>
  );
}
