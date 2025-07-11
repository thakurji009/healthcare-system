package com.healthcare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/reports")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReportController {

    @GetMapping("/list")
    public ResponseEntity<List<Map<String, Object>>> getReports() {
        List<Map<String, Object>> reports = Arrays.asList(
            Map.of("id", "R001", "patientName", "John Smith", "patientId", "P001",
                   "reportType", "Blood Test", "status", "Completed", "doctor", "Dr. Johnson",
                   "date", "2024-01-15", "priority", "High", "findings", "Elevated cholesterol levels detected"),
            Map.of("id", "R002", "patientName", "Sarah Johnson", "patientId", "P002",
                   "reportType", "X-Ray", "status", "Pending", "doctor", "Dr. Williams",
                   "date", "2024-01-14", "priority", "Medium", "findings", "Chest X-ray shows normal findings"),
            Map.of("id", "R003", "patientName", "Mike Davis", "patientId", "P003",
                   "reportType", "ECG", "status", "Completed", "doctor", "Dr. Brown",
                   "date", "2024-01-13", "priority", "Critical", "findings", "Irregular heartbeat pattern detected"),
            Map.of("id", "R004", "patientName", "Emily Wilson", "patientId", "P004",
                   "reportType", "MRI", "status", "In Progress", "doctor", "Dr. Garcia",
                   "date", "2024-01-12", "priority", "Medium", "findings", "Brain MRI scheduled for tomorrow"),
            Map.of("id", "R005", "patientName", "Robert Brown", "patientId", "P005",
                   "reportType", "Ultrasound", "status", "Completed", "doctor", "Dr. Martinez",
                   "date", "2024-01-11", "priority", "Low", "findings", "Abdominal ultrasound shows normal organs"),
            Map.of("id", "R006", "patientName", "Lisa Garcia", "patientId", "P006",
                   "reportType", "Blood Test", "status", "Completed", "doctor", "Dr. Johnson",
                   "date", "2024-01-10", "priority", "High", "findings", "Diabetes markers elevated")
        );
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getReportStats() {
        Map<String, Object> stats = Map.of(
            "totalReports", 6,
            "completedReports", 4,
            "pendingReports", 1,
            "inProgressReports", 1,
            "criticalPriority", 1,
            "highPriority", 2,
            "mediumPriority", 2,
            "lowPriority", 1
        );
        return ResponseEntity.ok(stats);
    }
} 