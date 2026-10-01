package com.TheUsProject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;
import java.util.HashMap;

import com.TheUsProject.dao.WatchedDao;
import com.TheUsProject.dao.UserDao;
import com.TheUsProject.exception.DaoException;
import com.TheUsProject.model.User;
import com.TheUsProject.model.Watched;

import java.util.UUID;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin
@RequestMapping("/api/watched")
public class WatchedController {

    private final WatchedDao watchedDao;
    private final UserDao userDao;

    private static final Logger log = LoggerFactory.getLogger(WatchedController.class);

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

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Watched>> getAllWatchedByUser(@PathVariable UUID userId) {
        List<Watched> watchedHistory = watchedDao.getAllWatchedByUserId(userId);

        if (watchedHistory == null || watchedHistory.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        
        return new ResponseEntity<>(watchedHistory, HttpStatus.OK);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getWatchedStats(Principal principal) {
        String username = (principal != null) ? principal.getName() : "Unknown";

        try {
            User currentUser = userDao.getUserByUsername(username);
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            int count = watchedDao.getWatchedCountByUserId(currentUser.getId());
            int totalRuntime = watchedDao.getTotalRuntimeByUserId(currentUser.getId());

            Map<String, Object> stats = new HashMap<>();
            stats.put("totalWatched", count);
            stats.put("totalRuntime", totalRuntime);

            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            if (e instanceof ResponseStatusException) {
                throw (ResponseStatusException) e;
            }
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Could not fetch stats", e);

        } finally {
            User currentUser = userDao.getUserByUsername(username);
            log.info("Finished processing stats request for user: {} - {}", currentUser.getId(), username);
        }
    }

    @DeleteMapping("/remove")
    public void removeFavorite(
            @RequestParam int tmdbMediaId,
            @RequestParam String mediaType,
            Principal principal) {

        try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            watchedDao.removeFromWatched(currentUser.getId(), tmdbMediaId, mediaType);

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
