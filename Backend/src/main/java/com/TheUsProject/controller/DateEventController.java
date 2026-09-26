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
import java.util.List;
import java.util.UUID;

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
    public DateEvent CreateDateEvent(@RequestBody DateEvent dateEvent, Principal principal) {
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
    @GetMapping("/{DateEventId}")
    public DateEvent getDateEventById(@PathVariable UUID DateEventId) {
        try {
            DateEvent dateEvent = dateEventDao.getDateEventById(DateEventId);
            if (dateEvent == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Date event not found.");
            }
            return dateEvent;
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/")
    public List<DateEvent> getAllDateEventsForUser(Principal principal) {
        try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }
            // Now fully working!
            return dateEventDao.getDateEventsByUserId(currentUser.getId());
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    // ========================================================================
    // Update
    // ========================================================================
    @PutMapping("/{DateEventId}")
    public DateEvent updateDateEvent(@PathVariable UUID DateEventId, @RequestBody DateEvent dateEvent,
            Principal principal) {
        try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            DateEvent existingEvent = dateEventDao.getDateEventById(DateEventId);
            if (existingEvent == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Date event not found.");
            }

            dateEvent.setDateId(DateEventId);

            return dateEventDao.updateDateEvent(dateEvent);

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    // ========================================================================
    // Delete
    // ========================================================================
    @DeleteMapping("/{DateEventId}")
    // @PreAuthorize("hasRole('ROLE_USER')")
    public void deleteDateEvent(@PathVariable UUID DateEventId) {
        try {
            // Optional: You might want to verify the event belongs to the principal before
            // deleting
            int rowsAffected = dateEventDao.deleteDateEventById(DateEventId);
            if (rowsAffected == 0) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Date event not found or already deleted.");
            }
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}