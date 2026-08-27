package com.test.practice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Required")
    private String firstName;

    @NotBlank(message = "Required")
    private String lastName;

    @NotBlank(message = "Required")
    private String email;

    @NotBlank(message = "Required")
    private String password;

    @NotBlank(message = "Required")
    private String gender;

    @NotNull(message = "Required")
    private String age;

    @NotNull(message = "Required")
    private String phoneNumber;

    @NotBlank(message = "Required")
    private String role;
}
