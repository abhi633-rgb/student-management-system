package com.test.practice.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="students")
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false, length = 4)
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private Long phonenumber;
    private int age;
    private String gender;
    private String department;
    private String course;
    private String address;
    private String password;
    private String role;
}

