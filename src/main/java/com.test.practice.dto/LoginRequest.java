package com.test.practice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank(message = "UserName Required")
    @Email(message = "Please Enter Valid Email")
    private String email;
    @NotBlank(message = "Password Required")
    private String password;
}