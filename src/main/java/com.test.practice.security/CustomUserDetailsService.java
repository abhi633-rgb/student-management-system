package com.test.practice.security;

import com.test.practice.entity.Registration;
import com.test.practice.entity.Student;
import com.test.practice.repository.RegisterUserRepository;
import com.test.practice.repository.StudentRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final RegisterUserRepository UsersRepo;

    public CustomUserDetailsService(RegisterUserRepository UsersRepo) {
        this.UsersRepo = UsersRepo;
    }


    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        Registration Registrations = UsersRepo.findByEmail(email.trim())
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        return new CustomUserDetails(Registrations);
    }
}