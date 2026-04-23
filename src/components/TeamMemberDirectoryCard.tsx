"use client";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import type {
  TeamDirectoryBadgeTone,
  TeamDirectoryMember,
} from "@/data/mockData";

const BADGE: Record<
  TeamDirectoryBadgeTone,
  { bg: string; color: string; border: string }
> = {
  danger: {
    bg: "#fef2f2",
    color: "#b91c1c",
    border: alpha("#b91c1c", 0.22),
  },
  success: {
    bg: "#f0fdf4",
    color: "#15803d",
    border: alpha("#15803d", 0.22),
  },
  warning: {
    bg: "#fefce8",
    color: "#a16207",
    border: alpha("#a16207", 0.25),
  },
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  }
  return (parts[0]?.slice(0, 2) ?? "?").toUpperCase();
}

function StatusPill({
  label,
  tone,
}: {
  label: string;
  tone: TeamDirectoryBadgeTone;
}) {
  const t = BADGE[tone];
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
        px: 1.25,
        py: 0.35,
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 700,
        lineHeight: 1.35,
        bgcolor: t.bg,
        color: t.color,
        border: "1px solid",
        borderColor: t.border,
      }}
    >
      {label}
    </Box>
  );
}

type TeamMemberDirectoryCardProps = {
  member: TeamDirectoryMember;
};

export default function TeamMemberDirectoryCard({
  member,
}: TeamMemberDirectoryCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid #E2E8F0",
        boxShadow: "0 1px 8px rgba(15, 23, 42, 0.06)",
        transition: "box-shadow 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          borderColor: alpha("#166534", 0.35),
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
        },
      }}
    >
      <CardActionArea
        sx={{
          height: "100%",
          alignItems: "stretch",
          justifyContent: "flex-start",
          p: 2,
        }}
      >
        <Stack spacing={1.75} sx={{ width: "100%", textAlign: "left" }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Avatar
              src={member.avatarUrl}
              alt={member.name}
              imgProps={{ loading: "lazy" }}
              sx={{
                width: 48,
                height: 48,
                bgcolor: alpha("#166534", 0.12),
                color: "#166534",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              {initialsFromName(member.name)}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{ fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.25 }}
              >
                {member.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                {member.role}
              </Typography>
            </Box>
          </Stack>

          <Stack spacing={1.25}>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Stack
                direction="row"
                spacing={0.75}
                sx={{ alignItems: "center", minWidth: 0 }}
              >
                <MonitorHeartRoundedIcon
                  sx={{ fontSize: 18, color: "text.secondary", flexShrink: 0 }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  Overall Wellbeing
                </Typography>
              </Stack>
              <StatusPill
                label={member.wellbeingLabel}
                tone={member.wellbeingTone}
              />
            </Stack>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Stack
                direction="row"
                spacing={0.75}
                sx={{ alignItems: "center", minWidth: 0 }}
              >
                <ShieldRoundedIcon
                  sx={{ fontSize: 18, color: "text.secondary", flexShrink: 0 }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  Stress Level
                </Typography>
              </Stack>
              <StatusPill label={member.stressLabel} tone={member.stressTone} />
            </Stack>
          </Stack>

          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              pt: 0.25,
              borderTop: "1px solid #EEF2F6",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontSize: 13 }}
            >
              {member.updatedAt}
            </Typography>
            <ChevronRightRoundedIcon
              sx={{ fontSize: 22, color: "text.secondary" }}
            />
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
