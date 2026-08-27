package com.test.practice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Intentionally using plain-text comparison because you asked to
        // skip password encryption for now. Replace with BCrypt later.
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityContextRepository securityContextRepository() {
        return new HttpSessionSecurityContextRepository();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // This project currently uses browser/session authentication.
            // CSRF is disabled so the existing JavaScript fetch() POST/PATCH requests
            // continue to work without adding CSRF tokens.
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                // Login page + login API must be public
                .requestMatchers("/", "/LogIn","/Registration","/api/registerUsers").permitAll()

                // Static resources
                .requestMatchers(
                    "/css/**",
                    "/js/**",
                    "/images/**",
                    "/webjars/**",
                    "/favicon.ico"
                ).permitAll()

                // Student dashboard
                .requestMatchers("/Student_aP73Ks_Dashboard-qW19")
                    .hasRole("STUDENT")

                // Admin dashboard
                .requestMatchers("/Admin_Ab73Kx_AdminPanel-dF52")
                    .hasRole("ADMIN")

                // Admin pages/APIs
                .requestMatchers(
                    "/admin/**",
                    "/addStudent",
                    "/addCourse",
                    "/Students",
                    "/Students/**",
                    "/deleteStudent/**"
                ).hasAnyRole("ADMIN","STUDENT")

                // Course data can be read by logged-in users
                .requestMatchers(
                    "/getAllCourses",
                    "/department/**"
                ).authenticated()

                // Password reset is intentionally left public because the
                // existing UI starts it from "Forgot Password".
                .requestMatchers("/resetPassword").permitAll()

                // Everything else requires authentication
                .anyRequest().authenticated()
            )

            // Keep the user's existing session after successful authentication.
            .sessionManagement(session ->
                session.maximumSessions(1)
            );

        return http.build();
    }
}
