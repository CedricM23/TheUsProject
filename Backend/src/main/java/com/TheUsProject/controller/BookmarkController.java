package com.TheUsProject.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.TheUsProject.dao.UserDao;
import com.TheUsProject.dao.BookmarkDao;
import com.TheUsProject.exception.DaoException;
import com.TheUsProject.model.Bookmark;
import com.TheUsProject.model.User;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    private final BookmarkDao bookmarkDao;
    private final UserDao userDao;

    public BookmarkController(BookmarkDao bookmarkDao, UserDao userDao) {
        this.bookmarkDao = bookmarkDao;
        this.userDao = userDao;
    }

    @PostMapping("/new")
    public Bookmark addBookmark(@RequestBody Bookmark bookmark, Principal principal) {
        try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            return bookmarkDao.addBookmark(currentUser.getId(), bookmark);

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("")
    public List<Bookmark> getMyBookmarks(Principal principal) {
        try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            return bookmarkDao.getBookmarksByUserId(currentUser.getId());

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/check")
    public boolean checkBookmark(
            @RequestParam int tmdbMediaId,
            @RequestParam String mediaType,
            Principal principal) {

        try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            return bookmarkDao.isBookmarked(currentUser.getId(), tmdbMediaId, mediaType);

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/remove") // MUST be /remove, not /{bookmarkId}
    public void removeBookmark(
            @RequestParam int tmdbMediaId, // MUST be @RequestParam
            @RequestParam String mediaType, 
            Principal principal) {
        
        try {
            User currentUser = userDao.getUserByUsername(principal.getName());
            if (currentUser == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
            }

            bookmarkDao.removeBookmark(currentUser.getId(), tmdbMediaId, mediaType);

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}