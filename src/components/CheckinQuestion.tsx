"use client";

import { Card, CardContent, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

type CheckinQuestionProps = {
  title: string;
  prompt: string;
  value: number;
  onChange: (score: number) => void;
};

export default function CheckinQuestion({ title, prompt, value, onChange }: CheckinQuestionProps) {
  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2.4 }}>
          {prompt}
        </Typography>
        <Stack
          direction="row"
          sx={{ mb: 0.7, justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant="caption">Low / Poor</Typography>
          <Typography variant="caption">High / Excellent</Typography>
        </Stack>
        <ToggleButtonGroup
          exclusive
          value={value}
          onChange={(_, nextValue: number | null) => {
            if (nextValue) {
              onChange(nextValue);
            }
          }}
          sx={{ width: "100%", justifyContent: "space-between", gap: 1 }}
        >
          {[1, 2, 3, 4, 5].map((score) => (
            <ToggleButton
              key={score}
              value={score}
              sx={{
                flexGrow: 1,
                borderRadius: "12px !important",
                border: "1px solid #E5EAF3 !important",
                fontWeight: 700,
                py: 1.2,
                "&.Mui-selected": {
                  borderColor: "#FDBA38 !important",
                  color: "#B45309",
                  backgroundColor: "#FFF7E6",
                },
              }}
            >
              {score}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </CardContent>
    </Card>
  );
}
