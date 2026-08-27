package com.test.practice.service;

import com.test.practice.dto.RegisterRequest;
import com.test.practice.entity.Registration;
import com.test.practice.repository.RegisterUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisteredUsers {
    @Autowired
    private RegisterUserRepository UsersRepo;

    public Registration Register(RegisterRequest request) {

        Registration Users = new Registration();

        Users.setFirstName(request.getFirstName());
        Users.setLastName(request.getLastName());
        Users.setEmail(request.getEmail());
        Users.setPassword(request.getPassword());
        Users.setGender(request.getGender());
        Users.setAge(Integer.valueOf(request.getAge()));
        Users.setPhoneNumber(Long.valueOf(request.getPhoneNumber()));
        Users.setRole(request.getRole());

        return UsersRepo.save(Users);
    }
}
