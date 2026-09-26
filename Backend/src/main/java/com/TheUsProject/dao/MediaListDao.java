package com.TheUsProject.dao;

import java.util.List;
import java.util.UUID;
import com.TheUsProject.model.MediaList;
import com.TheUsProject.model.MediaListItem;

public interface MediaListDao {
    // List Management
    MediaList createList(UUID userId, String listName);

    List<MediaList> getListsByUserId(UUID userId);

    MediaList getListById(int listId);

    void deleteList(UUID userId, int listId);

    // List Item Management
    void addItemToList(int listId, int tmdbMediaId, String mediaType);

    void removeItemFromList(int listId, int tmdbMediaId, String mediaType);

    List<MediaListItem> getListItems(int listId);
}