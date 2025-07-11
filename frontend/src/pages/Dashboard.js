import React, { useEffect, useState } from "react";
import api from "../api";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WarningIcon from "@mui/icons-material/Warning";
import Chip from "@mui/material/Chip";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [patientStats, setPatientStats] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    api.get("/patients/stats")
      .then(res => setPatientStats(res.data))
      .catch(() => setPatientStats([
        { name: "Jan", patients: 30 },
        { name: "Feb", patients: 45 },
        { name: "Mar", patients: 50 },
      ]));

    api.get("/alerts")
      .then(res => setAlerts(res.data))
      .catch(() => setAlerts([
        { 
          id: 1, 
          message: "High blood pressure alert for Patient X", 
          severity: "high",
          timestamp: "2024-01-15 10:30 AM",
          patientId: "P001"
        },
        { 
          id: 2, 
          message: "Low sugar alert for Patient Y", 
          severity: "medium",
          timestamp: "2024-01-15 09:15 AM",
          patientId: "P002"
        },
        { 
          id: 3, 
          message: "Irregular heartbeat detected for Patient Z", 
          severity: "critical",
          timestamp: "2024-01-15 08:45 AM",
          patientId: "P003"
        },
        { 
          id: 4, 
          message: "Temperature spike for Patient A", 
          severity: "medium",
          timestamp: "2024-01-15 08:20 AM",
          patientId: "P004"
        }
      ]));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        <Paper sx={{ flex: 1, minWidth: 350, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Patient Stats
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={patientStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="patients" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
        <Paper sx={{ flex: 1, minWidth: 350, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Active Alerts
          </Typography>
          <List>
            {alerts.map(alert => (
              <ListItem key={alert.id} divider>
                <ListItemIcon>
                  <WarningIcon 
                    color={alert.severity === "critical" ? "error" : 
                           alert.severity === "high" ? "warning" : "info"} 
                  />
                </ListItemIcon>
                <ListItemText 
                  primary={alert.message}
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <Chip 
                        label={alert.severity.toUpperCase()} 
                        color={alert.severity === "critical" ? "error" : 
                               alert.severity === "high" ? "warning" : "info"}
                        size="small"
                      />
                      <Typography variant="caption" color="text.secondary">
                        Patient ID: {alert.patientId} • {alert.timestamp}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard; 