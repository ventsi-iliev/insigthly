import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import type { MonthlyHistoryEntry } from "@/types/history";

type Props = { entry: MonthlyHistoryEntry };

export default function HistoryMonthlyCard({ entry }: Props) {
  return (
    <Card sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          backgroundColor: "#E8F5E9",
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderBottom: "1px solid #C8E6C9",
        }}
      >
        <CalendarMonthRoundedIcon sx={{ color: "primary.main", fontSize: 22 }} />
        <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
          {entry.date} · Monthly Reflection
        </Typography>
      </Box>
      <CardContent sx={{ p: 2.5 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#E8F5E9",
                height: "100%",
                border: "1px solid #C8E6C9",
              }}
              spacing={1}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <ThumbUpAltOutlinedIcon sx={{ color: "#2E7D32" }} />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, letterSpacing: "0.1em", color: "#2E7D32" }}
                >
                  WENT WELL
                </Typography>
              </Stack>
              <Typography sx={{ color: "text.primary", fontStyle: "italic", fontSize: 14 }}>
                {entry.wentWell || "—"}
              </Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#FCE4EC",
                height: "100%",
                border: "1px solid #F8BBD0",
              }}
              spacing={1}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <ThumbDownAltOutlinedIcon sx={{ color: "#C62828" }} />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, letterSpacing: "0.1em", color: "#C62828" }}
                >
                  CHALLENGES
                </Typography>
              </Stack>
              <Typography sx={{ color: "text.primary", fontStyle: "italic", fontSize: 14 }}>
                {entry.challenges || "—"}
              </Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#FFF8E1",
                height: "100%",
                border: "1px solid #FFE082",
              }}
              spacing={1}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <LightbulbOutlinedIcon sx={{ color: "#F57F17" }} />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, letterSpacing: "0.1em", color: "#E65100" }}
                >
                  LEARNINGS
                </Typography>
              </Stack>
              <Typography sx={{ color: "text.primary", fontStyle: "italic", fontSize: 14 }}>
                {entry.learnings || "—"}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
