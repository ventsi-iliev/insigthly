import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import type { WeeklyHistoryEntry } from "@/types/history";

type Props = { entry: WeeklyHistoryEntry };

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <Stack spacing={0.2}>
      <Typography variant="caption" sx={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 700, fontSize: 32, lineHeight: 1 }}>
        {value}
        <Typography component="span" sx={{ color: "text.secondary", fontSize: 18 }}>
          {" "}
          / 5
        </Typography>
      </Typography>
    </Stack>
  );
}

function badgeStyles(overall: number) {
  if (overall >= 4.2) {
    return { bg: "#E8F5E9", color: "#2E7D32" };
  }
  if (overall >= 3) {
    return { bg: "#FFF8E1", color: "#E65100" };
  }
  return { bg: "#FFEBEE", color: "#C62828" };
}

export default function HistoryWeeklyCard({ entry }: Props) {
  const { bg, color } = badgeStyles(entry.overall);

  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          sx={{
            mb: 2,
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
            <CalendarMonthRoundedIcon sx={{ color: "text.secondary" }} />
            <Typography sx={{ fontWeight: 700 }}>{entry.date}</Typography>
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>· Weekly Check-in</Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={0.4}
            sx={{
              color,
              backgroundColor: bg,
              px: 1.1,
              py: 0.4,
              borderRadius: 99,
              alignItems: "center",
            }}
          >
            <TrendingUpRoundedIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{entry.overall} Overall</Typography>
          </Stack>
        </Stack>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Metric label="Workload" value={entry.workload} />
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Metric label="Low Stress" value={entry.stressInverted} />
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Metric label="Support" value={entry.support} />
              </Grid>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Metric label="Satisfaction" value={entry.satisfaction} />
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack sx={{ p: 2, borderRadius: 3, backgroundColor: "#F1F5F9", height: "100%" }}>
              <Typography variant="caption" sx={{ textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Reflections
              </Typography>
              <Typography sx={{ mt: 1, color: "text.secondary", fontStyle: "italic" }}>
                {entry.reflections}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
