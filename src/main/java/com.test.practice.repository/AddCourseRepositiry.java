package com.test.practice.repository;

import com.test.practice.entity.AddCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddCourseRepositiry extends JpaRepository<AddCourse,Long> {
    List<AddCourse> findByDepartment(String department);
}
