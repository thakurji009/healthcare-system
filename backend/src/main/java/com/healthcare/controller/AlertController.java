package com.healthcare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/alerts")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AlertController {

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAlerts() {
        List<Map<String, Object>> alerts = Arrays.asList(
            Map.of("id", 1, "message", "High blood pressure alert for Patient X", 
                   "severity", "high", "timestamp", "2024-01-15 10:30 AM", "patientId", "P001"),
            Map.of("id", 2, "message", "Low sugar alert for Patient Y", 
                   "severity", "medium", "timestamp", "2024-01-15 09:15 AM", "patientId", "P002"),
            Map.of("id", 3, "message", "Irregular heartbeat detected for Patient Z", 
                   "severity", "critical", "timestamp", "2024-01-15 08:45 AM", "patientId", "P003"),
            Map.of("id", 4, "message", "Temperature spike for Patient A", 
                   "severity", "medium", "timestamp", "2024-01-15 08:20 AM", "patientId", "P004")
        );
        return ResponseEntity.ok(alerts);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteAlert(@PathVariable Integer id) {
        // In a real application, this would delete from database
        Map<String, String> response = new HashMap<>();
        response.put("message", "Alert deleted successfully");
        return ResponseEntity.ok(response);
    }
} 