package com.test.practice.repository;

import com.test.practice.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmail(String email);
    Optional<Student> findById(@NonNull Long id);
    Optional<Student> findByUserId(Long userId);
}
