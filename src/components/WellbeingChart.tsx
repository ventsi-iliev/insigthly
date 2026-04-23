"use client";

import { ReactNode, useCallback, useState } from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import type { LegendPayload } from "recharts/types/component/DefaultLegendContent";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";
import { TrendPoint } from "@/data/mockData";

type MetricKey = "overall" | "workload" | "stressInverted" | "support";

const METRIC_KEYS: MetricKey[] = ["overall", "workload", "stressInverted", "support"];

const defaultVisible: Record<MetricKey, boolean> = {
  overall: true,
  workload: true,
  stressInverted: true,
  support: true,
};

const LINE_STROKE = "#1D4D4F";

function OverallTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length || label == null) {
    return null;
  }
  const v = payload[0]?.value;
  return (
    <Box
      sx={{
        px: 1.25,
        py: 0.75,
        borderRadius: 1,
        bgcolor: "background.paper",
        boxShadow: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
        {label} | Overall Wellbeing : {v}
      </Typography>
    </Box>
  );
}

type WellbeingChartProps = {
  data: TrendPoint[];
  title?: string;
  subtitle?: string;
  showHint?: boolean;
  headerActions?: ReactNode;
  /** Single-series dashboard view (forest green line, dotted Y grid). */
  overallOnly?: boolean;
};

export default function WellbeingChart({
  data,
  title = "Team's Wellbeing Trends",
  subtitle = "Scores over time (Higher is better)",
  showHint = true,
  headerActions,
  overallOnly = false,
}: WellbeingChartProps) {
  const [visible, setVisible] = useState<Record<MetricKey, boolean>>(defaultVisible);

  const handleLegendClick = useCallback((entry: LegendPayload) => {
    const raw = entry.dataKey;
    if (raw == null || typeof raw === "function") {
      return;
    }
    const key = String(raw) as MetricKey;
    if (!METRIC_KEYS.includes(key)) {
      return;
    }
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{
            mb: 2,
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "flex-start" },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ mb: 0.3 }}>
              {title}
            </Typography>
            {subtitle ? (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ({subtitle})
              </Typography>
            ) : null}
            {showHint && !overallOnly ? (
              <Typography variant="caption" sx={{ display: "block", color: "text.secondary", mt: 0.5 }}>
                Click a series in the legend to show or hide it.
              </Typography>
            ) : null}
          </Box>
          {headerActions ? <Box sx={{ flexShrink: 0 }}>{headerActions}</Box> : null}
        </Stack>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid
              stroke="#D1D5DB"
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tickLine={false} axisLine={false} />
            {overallOnly ? (
              <Tooltip
                content={(props) => <OverallTooltip {...props} />}
                cursor={{ stroke: LINE_STROKE, strokeWidth: 1, strokeDasharray: "4 4" }}
              />
            ) : (
              <Tooltip />
            )}
            <Legend
              wrapperStyle={{
                cursor: overallOnly ? "default" : "pointer",
                userSelect: "none",
              }}
              {...(overallOnly ? {} : { onClick: handleLegendClick })}
            />
            <Line
              type="monotone"
              dataKey="overall"
              stroke={LINE_STROKE}
              strokeWidth={overallOnly ? 2.5 : 3}
              dot={
                overallOnly
                  ? { r: 4, fill: "#fff", stroke: LINE_STROKE, strokeWidth: 2 }
                  : { r: 4 }
              }
              activeDot={overallOnly ? { r: 5, fill: LINE_STROKE, stroke: "#fff", strokeWidth: 2 } : { r: 6 }}
              name={overallOnly ? "Overall Wellbeing" : "Overall"}
              hide={!visible.overall}
            />
            {!overallOnly ? (
              <>
                <Line
                  type="monotone"
                  dataKey="workload"
                  stroke="#2563eb"
                  strokeWidth={2}
                  name="Workload"
                  hide={!visible.workload}
                />
                <Line
                  type="monotone"
                  dataKey="stressInverted"
                  stroke="#dc2626"
                  strokeWidth={2}
                  name="Stress (Inverted)"
                  hide={!visible.stressInverted}
                />
                <Line
                  type="monotone"
                  dataKey="support"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  name="Support"
                  hide={!visible.support}
                />
              </>
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
