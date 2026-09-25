package com.TheUsProject.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.TheUsProject.dao.UserDao;
import com.TheUsProject.dao.FavoriteDao;
import com.TheUsProject.exception.DaoException;
import com.TheUsProject.model.Favorite;
import com.TheUsProject.model.User;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/favorites")
public class FavoriteController {
    
    private final FavoriteDao favoriteDao;
    private final UserDao userDao;

    public FavoriteController(FavoriteDao favoriteDao, UserDao userDao){
        this.favoriteDao = favoriteDao;
        this.userDao = userDao;
    }

    // ========================================================================
    // Create
    // ========================================================================

    @PostMapping("/new")
    public Favorite addFavorite(@RequestBody Favorite favorite, Principal principal) {
         try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            return favoriteDao.addFavorite(currentUser.getId(), favorite);

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    // ========================================================================
    // Read
    // ========================================================================

    @GetMapping("/")
    public List<Favorite> getMyFavorites(Principal principal) {
        try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            return favoriteDao.getFavoritesByUserId(currentUser.getId());

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/check")
    public boolean checkFavorite(
            @RequestParam int tmdbMediaId, 
            @RequestParam String mediaType, 
            Principal principal) {
        
        try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            return favoriteDao.isFavorite(currentUser.getId(), tmdbMediaId, mediaType);

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    // ========================================================================
    // Delete
    // ========================================================================

   @ResponseStatus(HttpStatus.NO_CONTENT)
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

            favoriteDao.removeFavorite(currentUser.getId(), tmdbMediaId, mediaType);

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}