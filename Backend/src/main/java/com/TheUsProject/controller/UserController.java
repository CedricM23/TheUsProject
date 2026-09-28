package com.TheUsProject.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.TheUsProject.dao.UserDao;
import com.TheUsProject.exception.DaoException;
import com.TheUsProject.model.User;

import java.util.UUID;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * The UserController is a class for handling HTTP Requests related to getting
 * User information.
 *
 * It depends on an instance of a UserDAO for retrieving and storing data. This
 * is provided
 * through dependency injection.
 *
 * Note: This class does not handle authentication (registration/login) of
 * Users. That is
 * handled separately in the AuthenticationController.
 */
@RestController
@CrossOrigin
@RequestMapping(path = "/api/users")
public class UserController {

    private UserDao userDao;

    public UserController(UserDao userDao) {
        this.userDao = userDao;
    }

    // @PreAuthorize("hasRole('ADMIN')")
    @PreAuthorize("permitAll()")
    @RequestMapping(method = RequestMethod.GET)
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();

        try {
            users = userDao.getUsers();
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

        return users;
    }

    @RequestMapping(path = "/{userId}", method = RequestMethod.GET)
    public User getById(@PathVariable UUID userId, Principal principal) {
        User user = null;

        try {
            user = userDao.getUserById(userId);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

        return user;
    }

    @RequestMapping(path = "/{userId}/update", method = RequestMethod.POST)
    public User updateUser(@PathVariable UUID userId, @RequestBody User user, Principal principal) {
        try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            User existingUser = userDao.getUserById(userId);
            if (existingUser == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
            }

            if (user.getFirstName() != null)
                existingUser.setFirstName(user.getFirstName());
            if (user.getLastName() != null)
                existingUser.setLastName(user.getLastName());
            if (user.getEmail() != null)
                existingUser.setEmail(user.getEmail());
            if (user.getImagePath() != null)
                existingUser.setImagePath(user.getImagePath());

            return userDao.UpdateUser(existingUser, userId);

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
