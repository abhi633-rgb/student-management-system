package com.test.practice.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="addEvent")
@Data
public class AddEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String eventTitle;
    private String eventDescription;
    private String eventDate;
    private String eventTime;
    private String eventCourse;
    private String eventType;
    private String eventPriorty;
    private String eventStatus;
    private String eventNotes;
}
