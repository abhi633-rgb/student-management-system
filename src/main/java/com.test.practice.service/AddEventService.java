package com.test.practice.service;

import com.test.practice.entity.AddEvent;
import com.test.practice.repository.AddEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddEventService {
    @Autowired
    private AddEventRepository addEventRepository;

    public AddEvent saveUser(AddEvent AddEvents){
        return addEventRepository.save(AddEvents);
    }

    public List<AddEvent> getEvent(String course) {
        return addEventRepository.findByEventCourseOrderByEventDateAsc(course);
    }
}
