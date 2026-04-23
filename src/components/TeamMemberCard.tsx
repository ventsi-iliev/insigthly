"use client";

import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import {
  Avatar,
  Box,
  Button,
  Card,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { useState } from "react";
import ScheduleOneOnOneDialog from "@/components/ScheduleOneOnOneDialog";
import { TeamMember } from "@/data/mockData";

type TeamMemberCardProps = {
  member: TeamMember;
};

function statusColor(status: TeamMember["status"]) {
  if (status === "high") return "#E11D48";
  if (status === "moderate") return "#D97706";
  return "#16A34A";
}

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
  }
  return (parts[0]?.[0] ?? "?").toUpperCase();
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const color = statusColor(member.status);
  const isCritical = member.status === "high";
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const opensScheduleModal = member.actionLabel === "Schedule 1:1";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: { xs: 2, sm: 2.5 },
        borderColor: isCritical ? alpha("#E11D48", 0.4) : "#E2E8F0",
        borderRadius: "12px",
        boxShadow:
          "0 1px 3px rgba(15, 23, 42, 0.06), 0 4px 12px rgba(15, 23, 42, 0.04)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          gap: { xs: 2, sm: 2 },
          gridTemplateColumns: {
            xs: "1fr",
            sm: "minmax(0, 1fr) minmax(0, max-content) auto",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center", minWidth: 0 }}
        >
          <Avatar
            src={member.avatarUrl}
            alt=""
            slotProps={{ img: { loading: "lazy" } }}
            sx={{
              width: 48,
              height: 48,
              flexShrink: 0,
              fontWeight: 700,
              boxShadow: "0 0 0 1px rgba(15, 23, 42, 0.06)",
            }}
          >
            {initialsFromName(member.name)}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.9375rem",
                lineHeight: 1.35,
                color: "#0f172a",
                wordBreak: "break-word",
              }}
            >
              {member.name}
            </Typography>
            <Typography
              sx={{
                color: "#64748b",
                fontSize: 13,
                mt: 0.35,
                wordBreak: "break-word",
              }}
            >
              {member.role}
            </Typography>
            <Typography
              sx={{ color: "#94a3b8", fontSize: 12, mt: 0.45, lineHeight: 1.4 }}
            >
              Last check-in: {member.lastCheckIn}
            </Typography>
          </Box>
        </Stack>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            justifySelf: { xs: "center", sm: "auto" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={0.75}
            sx={{ flexWrap: "wrap", rowGap: 0.5 }}
          >
            {isCritical ? (
              <ErrorOutlineRoundedIcon
                sx={{ fontSize: 18, color: "#E11D48", flexShrink: 0 }}
              />
            ) : null}
            <Typography
              component="span"
              variant="caption"
              sx={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "#94a3b8",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Stress level
            </Typography>
            <ShowChartRoundedIcon
              sx={{ fontSize: 18, color, flexShrink: 0 }}
              aria-hidden
            />
          </Stack>
          <Typography
            sx={{
              mt: 0.65,
              fontWeight: 700,
              fontSize: 15,
              color,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
            }}
          >
            {member.stressText} {member.stressScore}
          </Typography>
        </Box>

        <Button
          variant={isCritical ? "contained" : "outlined"}
          color={isCritical ? "error" : "inherit"}
          size="small"
          startIcon={
            isCritical ? (
              <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 17 }} />
            ) : undefined
          }
          onClick={() => {
            if (opensScheduleModal) {
              setScheduleOpen(true);
            }
          }}
          sx={{
            justifySelf: { xs: "stretch", sm: "end" },
            width: { xs: "100%", sm: "auto" },
            flexShrink: 0,
            fontWeight: 600,
            fontSize: "0.8125rem",
            whiteSpace: "nowrap",
            borderRadius: "10px",
            textTransform: "none",
            py: 0.85,
            px: 1.25,
            ...(isCritical
              ? {
                  bgcolor: "#E11D48",
                  color: "#fff",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "#C91840", boxShadow: "none" },
                }
              : {
                  bgcolor: "#f1f5f9",
                  color: "#475569",
                  borderColor: "#e2e8f0",
                  borderWidth: 1,
                  "&:hover": { bgcolor: "#e8eef4", borderColor: "#cbd5e1" },
                }),
          }}
        >
          {member.actionLabel}
        </Button>
      </Box>
      {opensScheduleModal ? (
        <ScheduleOneOnOneDialog
          open={scheduleOpen}
          memberName={member.name}
          onClose={() => setScheduleOpen(false)}
        />
      ) : null}
    </Card>
  );
}
