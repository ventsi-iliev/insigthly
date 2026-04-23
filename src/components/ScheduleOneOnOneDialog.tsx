"use client";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";

type ScheduleOneOnOneDialogProps = {
  open: boolean;
  memberName: string;
  onClose: () => void;
};

export default function ScheduleOneOnOneDialog({
  open,
  memberName,
  onClose,
}: ScheduleOneOnOneDialogProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function handleClose() {
    setDate("");
    setTime("");
    onClose();
  }

  function handleSendInvite() {
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        backdrop: { sx: { backdropFilter: "blur(6px)" } },
        paper: {
          sx: {
            borderRadius: 2.5,
            boxShadow: "0 24px 48px rgba(15, 23, 42, 0.12)",
          },
        },
      }}
      aria-labelledby="schedule-one-on-one-title"
    >
      <DialogTitle
        id="schedule-one-on-one-title"
        sx={{
          position: "relative",
          pr: 6,
          pt: 2.5,
          pb: 1,
          fontSize: "1.15rem",
          fontWeight: 700,
          color: "text.primary",
        }}
      >
        Schedule 1:1 with {memberName}
        <IconButton
          aria-label="Close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 12, top: 12, color: "text.secondary" }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1, pb: 1 }}>
        <Stack spacing={2.25}>
          <Box>
            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", mb: 0.75 }}>
              <CalendarMonthRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                Select Date
              </Typography>
            </Stack>
            <TextField
              fullWidth
              size="small"
              placeholder="dd.mm.yyyy"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              inputProps={{ "aria-label": "Select date" }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1.5,
                  bgcolor: "background.paper",
                },
              }}
            />
          </Box>

          <Box>
            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", mb: 0.75 }}>
              <AccessTimeRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                Select Time
              </Typography>
            </Stack>
            <TextField
              fullWidth
              size="small"
              placeholder="--:--"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              inputProps={{ "aria-label": "Select time" }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1.5,
                  bgcolor: "background.paper",
                },
              }}
            />
          </Box>

          <Stack
            direction="row"
            spacing={1.25}
            sx={{
              alignItems: "flex-start",
              p: 1.75,
              borderRadius: 2,
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.12),
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.25),
            }}
          >
            <MonitorHeartRoundedIcon
              sx={{ fontSize: 22, color: "secondary.main", flexShrink: 0, mt: 0.15 }}
            />
            <Typography variant="body2" sx={{ color: "text.primary", lineHeight: 1.5 }}>
              Scheduling a 1:1 meeting is a great way to check in on your team member&apos;s
              wellbeing and discuss any challenges they are facing.
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, pt: 0, gap: 1 }}>
        <Button variant="outlined" color="inherit" onClick={handleClose} sx={{ fontWeight: 600 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<EventRoundedIcon />}
          onClick={handleSendInvite}
          sx={{ fontWeight: 600 }}
        >
          Send Invite
        </Button>
      </DialogActions>
    </Dialog>
  );
}
