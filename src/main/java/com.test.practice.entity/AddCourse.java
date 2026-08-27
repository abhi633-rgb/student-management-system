package com.test.practice.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Table(name = "Courses")
@Data
public class AddCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String  department;
    private String  course;
    private String subject;
    private String code;
    private String semester;
    private String semesterYear;
    private String instructor;
    private String type;

}