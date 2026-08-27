package com.test.practice.generateID;

import com.test.practice.repository.StudentRepository;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class UserIdGenerator {

    private final StudentRepository studentRepository;

    public UserIdGenerator(StudentRepository STudentRepository) {
        this.studentRepository = STudentRepository;
    }

    public Long generate() {

        Long userId;

        do {
            userId = 1000L + new java.util.Random().nextInt(9000);
        } while (studentRepository.findByUserId(userId).isPresent());

        return userId;
    }
}