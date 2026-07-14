package com.example.employeemanagement.service;

import com.example.employeemanagement.dto.AuthRequest;
import com.example.employeemanagement.dto.AuthResponse;
import com.example.employeemanagement.dto.EmployeeDto;

public interface AuthService {

    AuthResponse login(AuthRequest authRequest);

    AuthResponse register(AuthRequest authRequest);
}
