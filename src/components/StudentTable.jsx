import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Button, Typography, Tooltip, Chip, Box,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress
} from '@mui/material';
import { Delete, Edit, Visibility, Add, Download } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import api from '../services/api';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/students');
      setStudents(res.data.students);
      console.log("Fetched students:", res.data.students);

      setCsvData(res.data.students.map((s) => ({
        Name: s.name,
        Email: s.email,
        Phone: s.phone,
        Handle: s.cfHandle,
        CurrentRating: s.currentRating,
        MaxRating: s.maxRating,
        LastSynced: new Date(s.lastSynced).toLocaleString()
      })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this student?')) {
      try {
        setLoading(true);
        await api.delete(`/students/${id}`);
        fetchStudents();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAdd = async () => {
    const name = prompt("Enter Name");
    const email = prompt("Enter Email");
    const phone = prompt("Enter Phone");
    const handle = prompt("Enter Codeforces Handle");

    if (name && email && phone && handle) {
      try {
        setLoading(true);
        await api.post('/students', { name, email, phone, cfHandle: handle });
        fetchStudents();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent({ ...student });
    setEditOpen(true);
  };

  const handleEditSave = async () => {
    try {
      setLoading(true);
      const { _id, name, email, phone, cfHandle } = editingStudent;

      await api.put(`/students/${_id}`, { name, email, phone });
      await api.put(`/students/${_id}/update-cf-handle`, { cfHandle });

      setEditOpen(false);
      fetchStudents();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ padding: 3, overflowX: 'auto', borderRadius: 3, minHeight: 400 }}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight={600}>
              📋 Students List
            </Typography>
            <Box display="flex" gap={2}>
              <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
                Add Student
              </Button>
              <CSVLink data={csvData} filename="students.csv" style={{ textDecoration: "none" }}>
                <Button variant="outlined" startIcon={<Download />}>
                  Download CSV
                </Button>
              </CSVLink>
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1096f2' }}>
                  {['Name', 'Email', 'Phone', 'CF Handle', 'Current Rating', 'Max Rating', 'Last Synced', 'Actions'].map(header => (
                    <TableCell key={header} sx={{ fontWeight: 'bold' }}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((s) => (
                  <TableRow key={s._id} hover>
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.phone}</TableCell>
                    <TableCell>
                      <Chip label={s.cfHandle} color="primary" size="small" sx={{ fontWeight: 'bold' }} />
                    </TableCell>
                    <TableCell>
                      <Typography color="secondary" fontWeight={600}>
                        {s.currentRating ?? '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="success.main" fontWeight={600}>
                        {s.maxRating ?? '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {s.lastSynced ? new Date(s.lastSynced).toLocaleString() : 'Never'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View Profile">
                        <IconButton color="primary" onClick={() => navigate(`/profile/${s._id}`)}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton color="warning" onClick={() => handleEditClick(s)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(s._id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}

                {students.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      No students found 😕
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Edit Dialog */}
          <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                label="Name"
                value={editingStudent?.name || ''}
                onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
              />
              <TextField
                label="Email"
                value={editingStudent?.email || ''}
                onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
              />
              <TextField
                label="Phone"
                value={editingStudent?.phone || ''}
                onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
              />
              <TextField
                label="Codeforces Handle"
                value={editingStudent?.cfHandle || ''}
                onChange={(e) => setEditingStudent({ ...editingStudent, cfHandle: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleEditSave}>Save</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Paper>
  );
};

export default StudentTable;
