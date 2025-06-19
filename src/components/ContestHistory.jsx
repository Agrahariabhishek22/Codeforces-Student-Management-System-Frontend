import React, { useEffect, useState } from "react";
import {
  Typography,
  MenuItem,
  Select,
  FormControl,
  Grid,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import api from "../services/api";
import RatingChart from "../components/RatingChart";

const ContestHistory = () => {
  const { id } = useParams();
  const [contestFilter, setContestFilter] = useState("90");
  const [contestData, setContestData] = useState([]);

  const fetchContestHistory = async () => {
    try {
      const res = await api.get(
        `/profile/${id}/contest-history?days=${contestFilter}`
      );
      setContestData(res.data.data.contests);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContestHistory();
  }, [contestFilter]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
  Contest History
</Typography>

<FormControl sx={{ minWidth: 150, mb: 2 }}>
  <Select
    value={contestFilter}
    onChange={(e) => setContestFilter(e.target.value)}
  >
    <MenuItem value="30">Last 30 Days</MenuItem>
    <MenuItem value="90">Last 90 Days</MenuItem>
    <MenuItem value="365">Last 365 Days</MenuItem>
  </Select>
</FormControl>

{contestData.length === 0 ? (
  <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
    Not given any contest in last {contestFilter} days.
  </Typography>
) : (
  <>
    <RatingChart data={contestData} />

    <Grid container spacing={2}>
      {contestData.map((contest) => (
        <Grid item xs={12} sm={6} md={4} key={contest.contestId}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2, height: "100%" }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {contest.contestName}
            </Typography>
            <Typography variant="body2">Rank: {contest.rank}</Typography>
            <Typography variant="body2">
              Previous Rating: {contest.oldRating}
            </Typography>
            <Typography variant="body2">
              New Rating: {contest.newRating}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color:
                  contest.newRating - contest.oldRating >= 0
                    ? "green"
                    : "red",
                fontWeight: 600,
              }}
            >
              Rating Change: {contest.newRating - contest.oldRating}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </>
)}

    </div>
  );
};

export default ContestHistory;
