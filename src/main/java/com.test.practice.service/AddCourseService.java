package com.test.practice.service;

import com.test.practice.dto.addCourseRequest;
import com.test.practice.entity.AddCourse;
import com.test.practice.repository.AddCourseRepositiry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddCourseService {
    @Autowired
    private AddCourseRepositiry CourseRepository;

    public AddCourse Register(addCourseRequest RequestsCourse) {
        AddCourse Course = new AddCourse();

        Course.setDepartment(RequestsCourse.getDepartment());
        Course.setCourse(RequestsCourse.getCourse());
        Course.setSubject(toTitleCase(RequestsCourse.getSubject()));
        Course.setCode(RequestsCourse.getCode().trim().toUpperCase());
        Course.setSemester(RequestsCourse.getSemester());
        Course.setSemesterYear(RequestsCourse.getSemesterYear());
        Course.setInstructor(toTitleCase(RequestsCourse.getInstructor()));
        Course.setType(toTitleCase(RequestsCourse.getType()));

        return CourseRepository.save(Course);
    }

    public List<AddCourse> getCourse(String department) {
        return CourseRepository.findByDepartment(department);
    }
    private String toTitleCase(String text) {

        if (text == null || text.isBlank()) {
            return text;
        }

        return Arrays.stream(text.trim().toLowerCase().split("\\s+"))
                .map(word -> Character.toUpperCase(word.charAt(0)) + word.substring(1))
                .collect(Collectors.joining(" "));
    }
}
