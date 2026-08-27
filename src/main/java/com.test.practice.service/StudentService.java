package com.test.practice.service;
import com.test.practice.dto.addStudentRequest;
import com.test.practice.entity.Student;
import com.test.practice.generateID.UserIdGenerator;
import com.test.practice.repository.AddCourseRepositiry;
import com.test.practice.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserIdGenerator userIdGenerator;
    @Autowired
    private AddCourseRepositiry CourseRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }
    public void deleteStudent(Long id){
        studentRepository.deleteById(id);
    }

    public Student getStudent(Long id) {
        return studentRepository.findById(id)
                .orElse(null);
    }
    public Student register(addStudentRequest Requests) {

        Student Students = new Student();

        Students.setUserId(userIdGenerator.generate());
        Students.setFirstName(Requests.getFirstName());
        Students.setLastName(Requests.getLastName());
        Students.setEmail(Requests.getEmail());
        Students.setPhonenumber(Requests.getPhonenumber());
        Students.setAge(Requests.getAge());
        Students.setGender(Requests.getGender());
        Students.setPassword(Requests.getPassword());
        Students.setRole("STUDENT");
        Students.setDepartment(Requests.getDepartment());
        Students.setCourse(Requests.getCourse());
        Students.setAddress(Requests.getAddress());

        return studentRepository.save(Students);
    }

    public Student updatePassword(String email, String password, String confirmPassword) {
        if(!password.equals(confirmPassword)) {
            return null;
        }
            Student students = studentRepository.findByEmail(email)
                    .orElseThrow(()-> new RuntimeException("Student Not Found"));
            students.setPassword(password);
            return studentRepository.save(students);
    }

    public List<?> getAllCourses() {
        return CourseRepository.findAll(Sort.by(Sort.Direction.DESC, "department"));
    }
}


