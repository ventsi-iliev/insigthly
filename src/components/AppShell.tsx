"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

type AppShellProps = {
  children: ReactNode;
};

const navItems = [
  { label: "Dashboard", href: "/", icon: DashboardRoundedIcon },
  { label: "Team Members", href: "/team-members", icon: GroupsRoundedIcon },
  {
    label: "Weekly Check-in",
    href: "/weekly-check-in",
    icon: EventAvailableRoundedIcon,
  },
  {
    label: "Monthly Check-in",
    href: "/monthly-check-in",
    icon: CalendarMonthRoundedIcon,
  },
  { label: "History Logs", href: "/history-logs", icon: HistoryRoundedIcon },
];

const primaryGreen = "#166534";

function avatarInitials(name: string, email: string) {
  const n = name.trim();
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
    }
    if (parts[0]?.length >= 2) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0]?.[0] ?? "?").toUpperCase();
  }
  const e = email.trim();
  if (e.length >= 2) {
    return e.slice(0, 2).toUpperCase();
  }
  return "?";
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const displayName = user?.name?.trim() || "Guest";
  const displayEmail = user?.email?.trim() || "";
  const initials = avatarInitials(user?.name ?? "", user?.email ?? "");

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        maxHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#F6F7F4",
      }}
    >
      <Box
        component="aside"
        sx={{
          flexShrink: 0,
          width: 256,
          maxWidth: 256,
          height: "100%",
          overflow: "hidden",
          borderRight: "1px solid #E2E8F0",
          backgroundColor: "#FFF",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{ px: 2, py: 2.5, display: "flex", alignItems: "center", gap: 1 }}
        >
          <Image src="/images/logo.svg" alt="Logo" width="36" height="36" />

          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.02em",
              fontSize: "1rem",
            }}
          >
            Insightly
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            px: 2,
            pb: 1,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Menu
        </Typography>
        <Stack spacing={0.5} sx={{ px: 1 }}>
          {navItems.map((item) => {
            const selected = pathname === item.href;
            const Icon = item.icon;
            return (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                startIcon={<Icon sx={{ fontSize: 20 }} />}
                sx={{
                  justifyContent: "flex-start",
                  py: 1,
                  px: 1.25,
                  borderRadius: 2,
                  fontSize: "0.8125rem",
                  color: selected ? primaryGreen : "#475569",
                  fontWeight: selected ? 700 : 500,
                  backgroundColor: selected
                    ? alpha(primaryGreen, 0.1)
                    : "transparent",
                  "&:hover": {
                    backgroundColor: alpha(primaryGreen, 0.14),
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 1.75 }}>
          <Button
            startIcon={<LogoutRoundedIcon />}
            fullWidth
            component={Link}
            href="/logout"
            onClick={logout}
            sx={{ justifyContent: "flex-start", color: "#64748B", mb: 1.3 }}
          >
            Logout
          </Button>
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: alpha(primaryGreen, 0.2),
                color: primaryGreen,
              }}
            >
              {initials}
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 600, fontSize: 14 }} noWrap>
                {displayName}
              </Typography>
              <Typography
                sx={{ fontSize: 12, color: "text.secondary" }}
                noWrap
                title={displayEmail || undefined}
              >
                {displayEmail || "—"}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Box
        component="main"
        sx={{
          flex: "1 1 auto",
          minWidth: 0,
          minHeight: 0,
          width: "100%",
          maxWidth: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          p: { xs: 2, md: 3.5 },
          px: { md: 1 },
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
