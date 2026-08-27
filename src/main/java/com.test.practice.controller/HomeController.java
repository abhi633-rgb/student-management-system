package com.test.practice.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class HomeController {
    @GetMapping("/")
    public String LogIn(){
        return "LogIn";
    }

    @GetMapping("/Student_aP73Ks_Dashboard-qW19")
    public String studentDB(){return "StudentDashboard";}

    @GetMapping("/Admin_Ab73Kx_AdminPanel-dF52")
    public String Dashboard(){
        return "Dashboard";
    }

    @GetMapping("/addStudent")
    public String AddStudent(){
        return "addStudent";
    }

    @GetMapping("/admin/addEvent")
    public String addEvent(){return "addEvent";}

    @GetMapping("/addCourse")
    public String addCourse(){return "addCourse";}

    @GetMapping("/Registration")
    public String Registration(){return "Registration";}
}
