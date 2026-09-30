package com.TheUsProject.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.TheUsProject.dao.WatchedDao;
import com.TheUsProject.dao.UserDao;
import com.TheUsProject.exception.DaoException;
import com.TheUsProject.model.User;
import com.TheUsProject.model.Watched;

import java.util.UUID;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/watched")
public class WatchedController {

    private final WatchedDao watchedDao;
    private final UserDao userDao;

    public WatchedController(WatchedDao watchedDao, UserDao userDao) {
        this.watchedDao = watchedDao;
        this.userDao = userDao;
    }

    @PostMapping("/")
    public Watched addToWatched(Principal principal, @RequestBody Watched watched) {
        try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            return watchedDao.addToWatched(currentUser.getId(), watched);

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/check")
    public Boolean checkWatched(@RequestParam int tmdbMediaId,
            @RequestParam String mediaType,
            Principal principal) {
        try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            return watchedDao.isWatched(currentUser.getId(), tmdbMediaId, mediaType);

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
