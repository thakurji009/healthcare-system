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
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import FilterListIcon from "@mui/icons-material/FilterList";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    dateRange: "",
    doctor: ""
  });

  useEffect(() => {
    // Mock reports data
    const mockReports = [
      { 
        id: "R001", 
        patientName: "John Smith", 
        patientId: "P001",
        reportType: "Blood Test", 
        status: "Completed", 
        doctor: "Dr. Johnson",
        date: "2024-01-15",
        priority: "High",
        findings: "Elevated cholesterol levels detected"
      },
      { 
        id: "R002", 
        patientName: "Sarah Johnson", 
        patientId: "P002",
        reportType: "X-Ray", 
        status: "Pending", 
        doctor: "Dr. Williams",
        date: "2024-01-14",
        priority: "Medium",
        findings: "Chest X-ray shows normal findings"
      },
      { 
        id: "R003", 
        patientName: "Mike Davis", 
        patientId: "P003",
        reportType: "ECG", 
        status: "Completed", 
        doctor: "Dr. Brown",
        date: "2024-01-13",
        priority: "Critical",
        findings: "Irregular heartbeat pattern detected"
      },
      { 
        id: "R004", 
        patientName: "Emily Wilson", 
        patientId: "P004",
        reportType: "MRI", 
        status: "In Progress", 
        doctor: "Dr. Garcia",
        date: "2024-01-12",
        priority: "Medium",
        findings: "Brain MRI scheduled for tomorrow"
      },
      { 
        id: "R005", 
        patientName: "Robert Brown", 
        patientId: "P005",
        reportType: "Ultrasound", 
        status: "Completed", 
        doctor: "Dr. Martinez",
        date: "2024-01-11",
        priority: "Low",
        findings: "Abdominal ultrasound shows normal organs"
      },
      { 
        id: "R006", 
        patientName: "Lisa Garcia", 
        patientId: "P006",
        reportType: "Blood Test", 
        status: "Completed", 
        doctor: "Dr. Johnson",
        date: "2024-01-10",
        priority: "High",
        findings: "Diabetes markers elevated"
      }
    ];
    
    setReports(mockReports);
    setFilteredReports(mockReports);
  }, []);

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    
    let filtered = reports;
    
    if (newFilters.type) {
      filtered = filtered.filter(report => report.reportType === newFilters.type);
    }
    if (newFilters.status) {
      filtered = filtered.filter(report => report.status === newFilters.status);
    }
    if (newFilters.doctor) {
      filtered = filtered.filter(report => report.doctor === newFilters.doctor);
    }
    
    setFilteredReports(filtered);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical": return "error";
      case "High": return "warning";
      case "Medium": return "info";
      case "Low": return "success";
      default: return "default";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "success";
      case "In Progress": return "warning";
      case "Pending": return "info";
      default: return "default";
    }
  };

  const reportTypes = ["Blood Test", "X-Ray", "ECG", "MRI", "Ultrasound", "CT Scan"];
  const statuses = ["Completed", "In Progress", "Pending"];
  const doctors = ["Dr. Johnson", "Dr. Williams", "Dr. Brown", "Dr. Garcia", "Dr. Martinez"];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Reports
              </Typography>
              <Typography variant="h4">
                {reports.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h4">
                {reports.filter(r => r.status === "Completed").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4">
                {reports.filter(r => r.status === "Pending").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Critical Priority
              </Typography>
              <Typography variant="h4">
                {reports.filter(r => r.priority === "Critical").length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FilterListIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Filters</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={filters.type}
                label="Report Type"
                onChange={(e) => handleFilterChange("type", e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                {reportTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <MenuItem value="">All Status</MenuItem>
                {statuses.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Doctor</InputLabel>
              <Select
                value={filters.doctor}
                label="Doctor"
                onChange={(e) => handleFilterChange("doctor", e.target.value)}
              >
                <MenuItem value="">All Doctors</MenuItem>
                {doctors.map(doctor => (
                  <MenuItem key={doctor} value={doctor}>{doctor}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Date Range"
              placeholder="MM/DD/YYYY - MM/DD/YYYY"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Reports Table */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6">
            Reports ({filteredReports.length})
          </Typography>
          <Box>
            <Button startIcon={<DownloadIcon />} sx={{ mr: 1 }}>
              Export
            </Button>
            <Button startIcon={<PrintIcon />}>
              Print
            </Button>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report ID</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Report Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Findings</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {report.patientName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {report.patientId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{report.reportType}</TableCell>
                  <TableCell>
                    <Chip 
                      label={report.status} 
                      color={getStatusColor(report.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{report.doctor}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Chip 
                      label={report.priority} 
                      color={getPriorityColor(report.priority)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                      {report.findings}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small">
                      <DownloadIcon />
                    </IconButton>
                    <IconButton size="small">
                      <PrintIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Reports; 