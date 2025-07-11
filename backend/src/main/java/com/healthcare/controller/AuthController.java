package com.healthcare.controller;

import com.healthcare.model.Doctor;
import com.healthcare.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Backend is working!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Optional<Doctor> doctor = doctorRepository.findByUsername(username);
        
        if (doctor.isPresent() && doctor.get().getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            Map<String, Object> user = new HashMap<>();
            user.put("id", doctor.get().getId());
            user.put("username", doctor.get().getUsername());
            user.put("password", doctor.get().getPassword());
            user.put("role", doctor.get().getRole());
            
            response.put("user", user);
            response.put("token", "dummy-jwt-token");
            
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
} 