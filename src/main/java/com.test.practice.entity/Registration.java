package com.test.practice.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "RegisterUsers")
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String gender;
    private Integer age;
    private Long phoneNumber;
    private String role;
}
