import React, { useEffect, useState } from "react";
import api from "../api";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import WarningIcon from "@mui/icons-material/Warning";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
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

  const handleDeleteAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical": return "error";
      case "high": return "warning";
      case "medium": return "info";
      default: return "default";
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Alerts
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        View and manage active alerts here.
      </Typography>
      
      {alerts.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No active alerts at the moment.
        </Alert>
      ) : (
        <Paper sx={{ mt: 2 }}>
          <List>
            {alerts.map(alert => (
              <ListItem key={alert.id} divider>
                <ListItemIcon>
                  <WarningIcon color={getSeverityColor(alert.severity)} />
                </ListItemIcon>
                <ListItemText
                  primary={alert.message}
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <Chip 
                        label={alert.severity.toUpperCase()} 
                        color={getSeverityColor(alert.severity)}
                        size="small"
                      />
                      <Typography variant="caption" color="text.secondary">
                        Patient ID: {alert.patientId} • {alert.timestamp}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={() => handleDeleteAlert(alert.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default Alerts; 