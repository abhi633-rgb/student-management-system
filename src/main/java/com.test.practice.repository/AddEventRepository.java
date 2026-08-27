package com.test.practice.repository;

import com.test.practice.entity.AddEvent;
import com.test.practice.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddEventRepository extends JpaRepository<AddEvent, Long>{

        List<AddEvent> findByEventCourseOrderByEventDateAsc(String course);
    }
