import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Typography, Box } from "@mui/material";
import "./Heatmap.css"; // for custom color styles
import { Tooltip as ReactTooltip } from "react-tooltip";

const Heatmap = ({ submissions }) => {
  const transformedData = Object.entries(submissions).map(([date, count]) => ({
    date,
    count,
  }));

  const startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  const endDate = new Date();

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h6" gutterBottom>
        Submission Activity Heatmap
      </Typography>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div style={{ width: '750px' }}>
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={transformedData}
            classForValue={(value) => {
              if (!value || value.count === 0) return 'color-empty';
              if (value.count <= 2) return 'color-scale-1';
              if (value.count <= 5) return 'color-scale-2';
              if (value.count <= 10) return 'color-scale-3';
              return 'color-scale-4';
            }}
            tooltipDataAttrs={(value) => ({
              'data-tooltip-id': 'heatmap-tooltip',
              'data-tooltip-content': value.date
                ? `${value.date}: ${value.count} submissions`
                : '',
            })}
            showWeekdayLabels={false}
          />
          <ReactTooltip id="heatmap-tooltip" />
        </div>
      </div>
    </Box>
  );
};

export default Heatmap;
