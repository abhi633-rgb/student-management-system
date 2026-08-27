package com.test.practice.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class addCourseRequest {
    @NotBlank(message = "Department Required")
    private String department;

    @NotBlank(message = "Course Required")
    private String course;

    @NotBlank(message = "Course Name Required")
    private String subject;

    @NotBlank(message = "Course Code Required")
    private String code;

    @NotBlank(message = "Semester Required")
    private String semester;

    @NotBlank(message = "Semester Year Required")
    private String semesterYear;

    @NotBlank(message = "Instructor Name Required")
    private String instructor;

    @NotBlank(message = "Course Type Required")
    private String Type;
}