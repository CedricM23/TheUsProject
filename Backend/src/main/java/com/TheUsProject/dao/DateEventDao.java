package com.TheUsProject.dao;

import java.util.List;
import java.util.UUID;

import com.TheUsProject.model.DateEvent;
import com.TheUsProject.model.RegisterUserDto;
import com.TheUsProject.model.User;

public interface DateEventDao {
    //Create
    DateEvent CreateDateEvent(UUID userId, DateEvent dateEvent); // Done
    //Read
    // List<DateEvent> getDateEventsbyUserUUD(UUID id); //Not Started
    DateEvent getDateEventById(UUID dateId); //Not Started
    //Update
    // DateEvent updaDateEvent(DateEvent dateevent); //Not Started
    //Delete
    int deleteDateEventById(UUID dateId); //Done
}
