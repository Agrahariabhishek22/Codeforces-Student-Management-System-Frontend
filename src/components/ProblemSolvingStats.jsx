import React, { useEffect, useState } from "react";
import {
  Typography,
  MenuItem,
  Select,
  FormControl,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../services/api";
import BarChart from "../components/BarChart";
import Heatmap from "../components/Heatmap";

const ProblemSolvingStats = () => {
  const { id } = useParams();
  const [problemFilter, setProblemFilter] = useState("30");
  const [problemStats, setProblemStats] = useState(null);

  const fetchProblemStats = async () => {
    try {
      const res = await api.get(
        `/profile/${id}/problem-stats?days=${problemFilter}`
      );
      setProblemStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProblemStats();
  }, [problemFilter]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Problem Solving Data
      </Typography>

      <FormControl sx={{ minWidth: 150, mb: 2 }}>
        <Select
          value={problemFilter}
          onChange={(e) => setProblemFilter(e.target.value)}
        >
          <MenuItem value="7">Last 7 Days</MenuItem>
          <MenuItem value="30">Last 30 Days</MenuItem>
          <MenuItem value="90">Last 90 Days</MenuItem>
        </Select>
      </FormControl>

      {problemStats && (
        <>
          {problemStats.data?.hardestProblem && (
            <Paper
              elevation={3}
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                borderLeft: "6px solid #1976d2",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                💪 Most Difficult Problem Solved
              </Typography>
              <Typography>
                🔹 <strong>{problemStats.data.hardestProblem.name}</strong> (
                {problemStats.data.hardestProblem.problemId})
              </Typography>
              <Typography>
                ⭐ Rating: {problemStats.data.hardestProblem.rating}
              </Typography>
              <Typography>
                ✅ Verdict: {problemStats.data.hardestProblem.verdict}
              </Typography>
              <Typography>
                📅 Solved on:{" "}
                {new Date(
                  problemStats.data.hardestProblem.timestamp
                ).toLocaleDateString()}
              </Typography>
            </Paper>
          )}

          <Grid container spacing={2} mb={2}>
            {[
              {
                label: "📈 Total Solved",
                value: problemStats.data.totalSolved,
              },
              {
                label: "📊 Avg. Rating",
                value: problemStats.data.avgRating.toFixed(2),
              },
              {
                label: "📅 Avg. Problems/Day",
                value: problemStats.data.avgPerDay.toFixed(2),
              },
            ].map((stat, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Paper elevation={1} sx={{ p: 2, textAlign: "center", borderRadius: 2 }}>
                  <Typography variant="subtitle2">{stat.label}</Typography>
                  <Typography variant="h6">{stat.value}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {problemStats.data.ratingBuckets &&
                Object.keys(problemStats.data.ratingBuckets).length > 0 && (
                  <BarChart data={problemStats.data.ratingBuckets} />
                )}
            </Grid>
            <Grid item xs={12} md={6}>
              {problemStats.data.heatmap &&
                Object.keys(problemStats.data.heatmap).length > 0 && (
                  <Heatmap submissions={problemStats.data.heatmap} />
                )}
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default ProblemSolvingStats;
