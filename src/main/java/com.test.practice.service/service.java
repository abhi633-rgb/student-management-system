package com.test.practice.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.practice.entity.signupdata;
import com.test.practice.repository.User;

@Service
public class service {
    @Autowired
    private User Users;

    public signupdata saveUser(signupdata Signupdata) {

        return Users.save(Signupdata);

    }

}