import React, { useEffect, useState } from "react";
import api from "../api";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from "recharts";

const PatientStats = () => {
  const [patientStats, setPatientStats] = useState([]);
  const [patients, setPatients] = useState([]);
  const [ageDistribution, setAgeDistribution] = useState([]);
  const [genderDistribution, setGenderDistribution] = useState([]);

  useEffect(() => {
    // Fetch patient statistics
    api.get("/patients/stats")
      .then(res => setPatientStats(res.data))
      .catch(() => setPatientStats([
        { name: "Jan", patients: 30, admissions: 15, discharges: 12 },
        { name: "Feb", patients: 45, admissions: 22, discharges: 18 },
        { name: "Mar", patients: 50, admissions: 28, discharges: 25 },
        { name: "Apr", patients: 65, admissions: 35, discharges: 30 },
        { name: "May", patients: 70, admissions: 40, discharges: 35 },
        { name: "Jun", patients: 85, admissions: 45, discharges: 42 },
      ]));

    // Mock patient data
    setPatients([
      { id: "P001", name: "John Smith", age: 45, gender: "Male", condition: "Hypertension", status: "Active", lastVisit: "2024-01-15" },
      { id: "P002", name: "Sarah Johnson", age: 32, gender: "Female", condition: "Diabetes", status: "Active", lastVisit: "2024-01-14" },
      { id: "P003", name: "Mike Davis", age: 58, gender: "Male", condition: "Heart Disease", status: "Active", lastVisit: "2024-01-13" },
      { id: "P004", name: "Emily Wilson", age: 29, gender: "Female", condition: "Asthma", status: "Inactive", lastVisit: "2024-01-10" },
      { id: "P005", name: "Robert Brown", age: 67, gender: "Male", condition: "Arthritis", status: "Active", lastVisit: "2024-01-12" },
      { id: "P006", name: "Lisa Garcia", age: 41, gender: "Female", condition: "Obesity", status: "Active", lastVisit: "2024-01-11" },
    ]);

    // Age distribution data
    setAgeDistribution([
      { name: "18-30", value: 25, color: "#8884d8" },
      { name: "31-45", value: 35, color: "#82ca9d" },
      { name: "46-60", value: 28, color: "#ffc658" },
      { name: "60+", value: 12, color: "#ff7300" },
    ]);

    // Gender distribution data
    setGenderDistribution([
      { name: "Male", value: 45, color: "#1976d2" },
      { name: "Female", value: 55, color: "#dc004e" },
    ]);
  }, []);

  const getStatusColor = (status) => {
    return status === "Active" ? "success" : "default";
  };

  const getConditionColor = (condition) => {
    const colors = {
      "Hypertension": "error",
      "Diabetes": "warning",
      "Heart Disease": "error",
      "Asthma": "info",
      "Arthritis": "warning",
      "Obesity": "secondary"
    };
    return colors[condition] || "default";
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Patient Statistics
      </Typography>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Patients
              </Typography>
              <Typography variant="h4">
                {patients.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Patients
              </Typography>
              <Typography variant="h4">
                {patients.filter(p => p.status === "Active").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Age
              </Typography>
              <Typography variant="h4">
                {Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                This Month
              </Typography>
              <Typography variant="h4">
                {patientStats[patientStats.length - 1]?.patients || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Patient Trends (6 Months)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={patientStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="patients" stroke="#1976d2" strokeWidth={2} />
                <Line type="monotone" dataKey="admissions" stroke="#2e7d32" strokeWidth={2} />
                <Line type="monotone" dataKey="discharges" stroke="#d32f2f" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Gender Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Age Distribution */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Age Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ageDistribution}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Age Distribution (Pie)
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={ageDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {ageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Patient Table */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Patient Details
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Condition</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Visit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
                        {patient.name.charAt(0)}
                      </Avatar>
                      {patient.name}
                    </Box>
                  </TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>
                    <Chip 
                      label={patient.condition} 
                      color={getConditionColor(patient.condition)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={patient.status} 
                      color={getStatusColor(patient.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PatientStats; 