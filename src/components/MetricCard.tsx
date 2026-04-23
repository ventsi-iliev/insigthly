import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/material/SvgIcon";
import type { WellbeingCardIcon } from "@/data/mockData";

const METRIC_ICONS: Record<
  WellbeingCardIcon,
  { Icon: SvgIconComponent; color: string }
> = {
  medal: { Icon: EmojiEventsRoundedIcon, color: "#0C9D72" },
  camera: { Icon: VideocamRoundedIcon, color: "#2563eb" },
  shield: { Icon: ShieldRoundedIcon, color: "#9333ea" },
  star: { Icon: StarRoundedIcon, color: "#ca8a04" },
};

type MetricCardProps = {
  title: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: WellbeingCardIcon;
};

export default function MetricCard({ title, value, delta, positive, icon }: MetricCardProps) {
  const isNeutral = delta.toLowerCase().includes("no change");
  const { Icon, color } = METRIC_ICONS[icon];

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          position: "relative",
          p: 2.25,
          pr: 6,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ position: "absolute", top: 14, right: 14 }}>
          <Icon sx={{ fontSize: 28, color }} aria-hidden />
        </Box>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontWeight: 600,
            minHeight: "2.75em",
            lineHeight: 1.35,
            pr: 1,
          }}
        >
          {title}
        </Typography>
        <Stack
          direction="row"
          sx={{
            mt: "auto",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 36, fontWeight: 700, lineHeight: 1 }}>
            {value}
          </Typography>
          <Stack direction="row" spacing={0.4} sx={{ alignItems: "center" }}>
            {isNeutral ? (
              <RemoveRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            ) : positive ? (
              <TrendingUpRoundedIcon sx={{ fontSize: 16, color: "#0C9D72" }} />
            ) : (
              <TrendingDownRoundedIcon sx={{ fontSize: 16, color: "#E11D48" }} />
            )}
            <Typography
              sx={{
                fontSize: 13,
                color: isNeutral ? "text.secondary" : positive ? "#0C9D72" : "#E11D48",
              }}
            >
              {delta}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
