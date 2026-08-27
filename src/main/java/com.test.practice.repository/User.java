package com.test.practice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.test.practice.entity.signupdata;

public interface User extends JpaRepository<signupdata, Long> {
}