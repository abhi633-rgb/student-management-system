package com.test.practice.dto;

import lombok.Data;

@Data
public class LoginResult {
    private String redirect;
    private Long id;

    public LoginResult(String redirect, Long id) {
        this.redirect = redirect;
        this.id = id;
    }
}
