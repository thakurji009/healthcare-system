package com.healthcare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PatientController {

    @GetMapping("/stats")
    public ResponseEntity<List<Map<String, Object>>> getPatientStats() {
        List<Map<String, Object>> stats = Arrays.asList(
            Map.of("name", "Jan", "patients", 30, "admissions", 15, "discharges", 12),
            Map.of("name", "Feb", "patients", 45, "admissions", 22, "discharges", 18),
            Map.of("name", "Mar", "patients", 50, "admissions", 28, "discharges", 25),
            Map.of("name", "Apr", "patients", 65, "admissions", 35, "discharges", 30),
            Map.of("name", "May", "patients", 70, "admissions", 40, "discharges", 35),
            Map.of("name", "Jun", "patients", 85, "admissions", 45, "discharges", 42)
        );
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Map<String, Object>>> getPatients() {
        List<Map<String, Object>> patients = Arrays.asList(
            Map.of("id", "P001", "name", "John Smith", "age", 45, "gender", "Male", 
                   "condition", "Hypertension", "status", "Active", "lastVisit", "2024-01-15"),
            Map.of("id", "P002", "name", "Sarah Johnson", "age", 32, "gender", "Female", 
                   "condition", "Diabetes", "status", "Active", "lastVisit", "2024-01-14"),
            Map.of("id", "P003", "name", "Mike Davis", "age", 58, "gender", "Male", 
                   "condition", "Heart Disease", "status", "Active", "lastVisit", "2024-01-13"),
            Map.of("id", "P004", "name", "Emily Wilson", "age", 29, "gender", "Female", 
                   "condition", "Asthma", "status", "Inactive", "lastVisit", "2024-01-10"),
            Map.of("id", "P005", "name", "Robert Brown", "age", 67, "gender", "Male", 
                   "condition", "Arthritis", "status", "Active", "lastVisit", "2024-01-12"),
            Map.of("id", "P006", "name", "Lisa Garcia", "age", 41, "gender", "Female", 
                   "condition", "Obesity", "status", "Active", "lastVisit", "2024-01-11")
        );
        return ResponseEntity.ok(patients);
    }
} 