package com.TheUsProject.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.TheUsProject.dao.DateEventDao;
import com.TheUsProject.dao.UserDao;
import com.TheUsProject.exception.DaoException;
import com.TheUsProject.model.DateEvent;
import com.TheUsProject.model.User;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin
@RequestMapping("/api/dateevents")
public class DateEventController {
    private final DateEventDao dateEventDao;
    private final UserDao userDao;

    public DateEventController(DateEventDao dateEventDao, UserDao userDao) {
        this.dateEventDao = dateEventDao;
        this.userDao = userDao;
    }

    // ========================================================================
    // Create
    // ========================================================================

    @PostMapping("/")
    public DateEvent CreateDateEvent(@RequestBody DateEvent dateEvent, Principal principal){
          try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            return dateEventDao.CreateDateEvent(currentUser.getId(), dateEvent);

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    // ========================================================================
    // Read
    // ========================================================================

    // ========================================================================
    // Update
    // ========================================================================

    // ========================================================================
    // Delete
    // ========================================================================
    @DeleteMapping("/{DateEventId}")
    // @PreAuthorize("hasRole('ROLE_USER')")
    public void deleteDateEvent(@PathVariable UUID DateEventId) {
        try {
            dateEventDao.deleteDateEventById(DateEventId);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}
