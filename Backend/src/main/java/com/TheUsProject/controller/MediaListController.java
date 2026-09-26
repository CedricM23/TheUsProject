package com.TheUsProject.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import com.TheUsProject.dao.UserDao;
import com.TheUsProject.dao.MediaListDao;
import com.TheUsProject.model.MediaList;
import com.TheUsProject.model.MediaListItem;
import com.TheUsProject.model.User;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/lists")
public class MediaListController {
    
    private final MediaListDao mediaListDao;
    private final UserDao userDao;

    public MediaListController(MediaListDao mediaListDao, UserDao userDao){
        this.mediaListDao = mediaListDao;
        this.userDao = userDao;
    }

    // --- LIST MANAGEMENT ---

    @PostMapping("/new")
    public MediaList createList(@RequestBody MediaList list, Principal principal) {
        User currentUser = userDao.getUserByUsername(principal.getName());
        return mediaListDao.createList(currentUser.getId(), list.getListName());
    }

    @GetMapping("")
    public List<MediaList> getMyLists(Principal principal) {
        User currentUser = userDao.getUserByUsername(principal.getName());
        return mediaListDao.getListsByUserId(currentUser.getId());
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{listId}")
    public void deleteList(@PathVariable int listId, Principal principal) {
        User currentUser = userDao.getUserByUsername(principal.getName());
        mediaListDao.deleteList(currentUser.getId(), listId);
    }

    // --- LIST ITEM MANAGEMENT ---

    @PostMapping("/{listId}/items")
    public void addItemToList(
            @PathVariable int listId, 
            @RequestBody MediaListItem item, 
            Principal principal) {
        
        verifyListOwnership(listId, principal);
        mediaListDao.addItemToList(listId, item.getTmdbMediaId(), item.getMediaType());
    }

    @GetMapping("/{listId}/items")
    public List<MediaListItem> getListItems(@PathVariable int listId, Principal principal) {
        verifyListOwnership(listId, principal);
        return mediaListDao.getListItems(listId);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{listId}/items/remove")
    public void removeItemFromList(
            @PathVariable int listId, 
            @RequestParam int tmdbMediaId, 
            @RequestParam String mediaType, 
            Principal principal) {
        
        verifyListOwnership(listId, principal);
        mediaListDao.removeItemFromList(listId, tmdbMediaId, mediaType);
    }

    // Security Helper Method
    private void verifyListOwnership(int listId, Principal principal) {
        User currentUser = userDao.getUserByUsername(principal.getName());
        MediaList targetList = mediaListDao.getListById(listId);
        
        if (targetList == null || !targetList.getUserId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You do not have permission to modify this list");
        }
    }
}