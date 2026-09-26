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
    List<DateEvent> getDateEventsByUserId(UUID userId);
    DateEvent getDateEventById(UUID dateId); //Done
    //Update
    DateEvent updateDateEvent(DateEvent dateEvent);
    //Delete
    int deleteDateEventById(UUID dateId); //Done
}
