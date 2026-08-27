package com.test.practice.security;

import com.test.practice.dto.LoginRequest;
import com.test.practice.entity.Registration;
import com.test.practice.repository.RegisterUserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final RegisterUserRepository UserRepository;
    private final SecurityContextRepository securityContextRepository;

    public AuthController(
            AuthenticationManager authenticationManager,
            RegisterUserRepository UserRepository,
            SecurityContextRepository securityContextRepository) {
        this.authenticationManager = authenticationManager;
        this.UserRepository = UserRepository;
        this.securityContextRepository = securityContextRepository;
    }

    @PostMapping("/LogIn")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse response) {

        try {
            Authentication authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getEmail().trim(),
                                    request.getPassword()
                            )
                    );

            // Put the authenticated user into Spring Security's SecurityContext
            // and persist it in the HTTP session.
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);

            // This is what makes the login survive the next browser request.
            securityContextRepository.saveContext(
                    context, httpRequest, response
            );
            Registration Registrations = UserRepository.findByEmail(
                    request.getEmail().trim()
            ).orElseThrow(() ->
                    new RuntimeException("Invalid email or password")
            );

            if ("ADMIN".equals(Registrations.getRole())) {

                return ResponseEntity.ok(
                        Map.of(
                                "redirect", "/Admin_Ab73Kx_AdminPanel-dF52",
                                "studentId", Registrations.getId()
                        )
                );
            }

            if ("STUDENT".equals(Registrations.getRole())) {

                return ResponseEntity.ok(
                        Map.of(
                                "redirect", "/Student_aP73Ks_Dashboard-qW19",
                                "studentId", Registrations.getId()
                        )
                );
            }

            throw new RuntimeException("Invalid user role");

        } catch (AuthenticationException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "UnAuthorized User"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        var session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok(
                Map.of("message", "Logout successful")
        );
    }
}
