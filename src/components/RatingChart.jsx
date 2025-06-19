import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";

const RatingChart = ({ data }) => {
  // Transform data if needed
  // console.log(data);

  const formattedData = data.map((contest, idx) => ({
    name: `#${idx + 1}`,
    rating: contest.newRating,
    contestName: contest.contestName,
    rank: contest.rank,
  }));

  return (
    <div style={{ height: 300, marginBottom: "2rem" }}>
      <Typography variant="h6" gutterBottom>
        Rating Progress
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip
            formatter={(value, name, props) => [
              `${value}`,
              name === "rating" ? "Rating" : name,
            ]}
            labelFormatter={(label, payload) => {
              const contest = payload?.[0]?.payload;
              if (!contest) return ""; // Prevent crash
              return `${contest.contestName} (Rank: ${contest.rank})`;
            }}
          />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;
