package com.test.practice.repository;

import com.test.practice.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegisterUserRepository extends JpaRepository<Registration, Long> {
    Optional<Registration> findByEmail(String email);
}
