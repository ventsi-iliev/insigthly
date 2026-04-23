"use client";

import { useMemo, useState } from "react";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import {
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Container,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import AppShell from "@/components/AppShell";
import MetricCard from "@/components/MetricCard";
import TeamMemberCard from "@/components/TeamMemberCard";
import WellbeingChart from "@/components/WellbeingChart";
import RequireAuth from "@/components/RequireAuth";
import { teamMembers, trendData, wellbeingCards } from "@/data/mockData";
import type { TrendPoint } from "@/data/mockData";

type RangeKey = "1M" | "3M" | "6M" | "All";

function sliceTrendData(data: TrendPoint[], range: RangeKey): TrendPoint[] {
  const n = { "1M": 1, "3M": 3, "6M": 6, All: data.length }[range];
  return data.slice(-Math.min(n, data.length));
}

export default function DashboardPage() {
  const [range, setRange] = useState<RangeKey>("All");
  const chartData = useMemo(() => sliceTrendData(trendData, range), [range]);

  return (
    <RequireAuth>
      <AppShell>
        <Container maxWidth="lg">
          <Box
            sx={{
              mb: 2.5,
              py: 2,
              px: { xs: 2, sm: 3 },
              borderRadius: 3,
              textAlign: "center",
              background: (theme) =>
                `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)} 0%, ${alpha(
                  theme.palette.primary.main,
                  0.06,
                )} 45%, ${alpha("#fff", 0.95)} 100%)`,
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.22),
              boxShadow: "0 4px 24px rgba(15, 23, 42, 0.06)",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                mb: 1,
              }}
            >
              <Chip
                icon={
                  <AutoAwesomeRoundedIcon sx={{ "&&": { fontSize: 18 } }} />
                }
                label="AI-crafted"
                size="small"
                color="secondary"
                variant="filled"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  "& .MuiChip-icon": { ml: 0.5 },
                }}
              />
            </Stack>
            <Typography
              component="h1"
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "primary.dark",
                letterSpacing: "-0.02em",
                lineHeight: 1.35,
                mb: 0.75,
              }}
            >
              This interface was generated entirely with AI
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                maxWidth: 520,
                mx: "auto",
                lineHeight: 1.55,
              }}
            >
              A fast, exploratory preview—polished visuals and flows you can
              react to. Production builds would layer in your brand,
              accessibility audits, and real data.
            </Typography>
          </Box>

          <Stack
            direction="row"
            sx={{
              mb: 2,
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h5">Wellbeing Overview</Typography>
              <Typography variant="body2">
                Track weekly metrics for yourself and your team to prevent
                burnout.
              </Typography>
            </Box>
          </Stack>

          <Grid container spacing={2} sx={{ mb: 2.3, alignItems: "stretch" }}>
            {wellbeingCards.map((card) => (
              <Grid
                key={card.title}
                size={{ xs: 12, sm: 6, lg: 3 }}
                sx={{ display: "flex" }}
              >
                <MetricCard {...card} />
              </Grid>
            ))}
          </Grid>

          <WellbeingChart
            data={chartData}
            overallOnly
            subtitle=""
            showHint={false}
            headerActions={
              <ToggleButtonGroup
                exclusive
                size="small"
                value={range}
                onChange={(_, v: RangeKey | null) => v && setRange(v)}
                sx={{
                  "& .MuiToggleButton-root": {
                    px: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                  },
                }}
              >
                <ToggleButton value="1M">1M</ToggleButton>
                <ToggleButton value="3M">3M</ToggleButton>
                <ToggleButton value="6M">6M</ToggleButton>
                <ToggleButton value="All">All</ToggleButton>
              </ToggleButtonGroup>
            }
          />

          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "primary.dark",
                letterSpacing: "-0.02em",
              }}
            >
              Team Members
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 2.5, mt: 0.5, maxWidth: 720 }}
            >
              Review the stress levels of your team based on their recent weekly
              inputs.
            </Typography>
            <Grid container spacing={2.5} sx={{ alignItems: "stretch" }}>
              {teamMembers.map((member) => (
                <Grid
                  key={member.name}
                  size={{ xs: 12, md: 6 }}
                  sx={{ display: "flex" }}
                >
                  <TeamMemberCard member={member} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </AppShell>
    </RequireAuth>
  );
}
