package com.test.practice.security;

import com.test.practice.entity.Registration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private final Registration Registrations;

    public CustomUserDetails(Registration Registrations) {
        this.Registrations = Registrations;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return List.of(
                new SimpleGrantedAuthority("ROLE_" + Registrations.getRole())
        );
    }

    @Override
    public String getPassword() {
        return Registrations.getPassword();
    }

    @Override
    public String getUsername() {
        return Registrations.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}