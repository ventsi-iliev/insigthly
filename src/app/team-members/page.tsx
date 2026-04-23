"use client";

import { Container, Grid, Stack, Typography } from "@mui/material";
import AppShell from "@/components/AppShell";
import TeamMemberDirectoryCard from "@/components/TeamMemberDirectoryCard";
import RequireAuth from "@/components/RequireAuth";
import { teamDirectoryMembers } from "@/data/mockData";

export default function TeamMembersPage() {
  return (
    <RequireAuth>
      <AppShell>
        <Container maxWidth="xl">
          <Stack spacing={0.75} sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "primary.dark",
                letterSpacing: "-0.02em",
              }}
            >
              Team Members
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", maxWidth: 720 }}
            >
              Monitor wellbeing across your team and manage individual
              check-ins.
            </Typography>
          </Stack>

          <Grid container spacing={2.5}>
            {teamDirectoryMembers.map((member) => (
              <Grid key={member.name} size={{ xs: 12, sm: 6, lg: 3 }}>
                <TeamMemberDirectoryCard member={member} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </AppShell>
    </RequireAuth>
  );
}
