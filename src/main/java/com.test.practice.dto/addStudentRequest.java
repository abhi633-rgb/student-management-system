package com.test.practice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class addStudentRequest {
    @NotBlank(message = "FirstName Required")
    private String firstName;

    @NotBlank(message = "LastName Required")
    private String lastName;

    @NotBlank(message = "Email Required")
    @Email(message="Enter Valid Email")
    private String email;

    @NotNull(message = "PhoneNumber Required")
    private Long phonenumber;

    @NotNull(message = "Age Required")
    private Integer age;

    @NotBlank(message = "Gender Required")
    private String gender;

    @NotBlank(message = "Department Required")
    private String department;

    @NotBlank(message = "Course Required")
    private String course;

    @NotBlank(message = "Address Required")
    private String address;

    @NotBlank(message = "Password Required")
    private String password;

}
