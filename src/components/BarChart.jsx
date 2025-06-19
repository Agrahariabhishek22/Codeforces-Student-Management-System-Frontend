import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList
} from 'recharts';
import { Typography } from '@mui/material';

const BarChartComponent = ({ data }) => {
  // Convert {800: 5, 900: 10} into [{ rating: '800', count: 5 }, ...]
  if (!data || Object.keys(data).length === 0) return null;
  const formattedData = Object.entries(data).map(([rating, count]) => ({
    rating,
    count
  }));

  return (
    <div style={{ height: 300 }}>
      <Typography variant="h6" gutterBottom>
        Problems Solved per Rating Bucket
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d">
            <LabelList dataKey="count" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
