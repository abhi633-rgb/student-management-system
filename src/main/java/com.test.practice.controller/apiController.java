package com.test.practice.controller;
import com.test.practice.dto.RegisterRequest;
import com.test.practice.dto.addCourseRequest;
import com.test.practice.dto.addStudentRequest;
import com.test.practice.entity.AddCourse;
import com.test.practice.entity.AddEvent;
import com.test.practice.entity.Student;
import com.test.practice.service.AddCourseService;
import com.test.practice.service.AddEventService;
import com.test.practice.service.RegisteredUsers;
import com.test.practice.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class apiController {

    @Autowired
    private StudentService Service;
    @Autowired
    private AddEventService EventService;
    @Autowired
    private AddCourseService CourseService;
    @Autowired
    private RegisteredUsers users;

    @PostMapping("/addStudent")
    public ResponseEntity<?> register(@Valid @RequestBody addStudentRequest Requests) {
        Service.register(Requests);
        return ResponseEntity.ok(Map.of("message", "Student Add successful"));
    }

    @GetMapping("/Students")
    public List<Student> getStudents() {
        return Service.getAllStudents();
    }

    @GetMapping("/Students/{id}")
    public Student getStudent(@PathVariable Long id) {
        return Service.getStudent(id);
    }

    @DeleteMapping("/deleteStudent/{id}")
    public String deleteStudent(@PathVariable Long id) {
        Service.deleteStudent(id);
        return "Deleted";
    }

    @PostMapping("/admin/AddEvent")
    public AddEvent addEvent(@RequestBody AddEvent AddEvents) {
        return EventService.saveUser(AddEvents);
    }

    @GetMapping("/admin/AddEvent/{course}")
    public List<AddEvent> getEvent(@PathVariable String course) {
        return EventService.getEvent(course);
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationErrors(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(error.getField(), error.getDefaultMessage())
                );

        return ResponseEntity.badRequest().body(errors);
    }

    //    Post/Get Course Details{
    @PostMapping("/addCourse")
    public ResponseEntity<?> CourseRegister(@Valid @RequestBody addCourseRequest RequestsCourse) {
        CourseService.Register(RequestsCourse);
        return ResponseEntity.ok(Map.of("message", "Course Add successful"));
    }

    @GetMapping("/getAllCourses")
    public List<?> getCourses() {return Service.getAllCourses();
    }

    @GetMapping("/department/{department}")
    public List<AddCourse> getCourse(@PathVariable String department){
        return CourseService.getCourse(department);
    }
//}

//    Patch Request to Update a Password{

    @PatchMapping("/resetPassword")
    public Student updatePassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        String confirmPassword = request.get("confirmPassword");
        try {
            Thread.sleep(5000); // 5 seconds
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        return Service.updatePassword(email, password,confirmPassword);
    }

//    }

//    Register the User Based On the Role
    @PostMapping("/api/registerUsers")
    public ResponseEntity<?> UserRegister(@Valid @RequestBody RegisterRequest request){
        users.Register(request);
        return ResponseEntity.ok(Map.of("message", "Registration successful"));
    }
}
