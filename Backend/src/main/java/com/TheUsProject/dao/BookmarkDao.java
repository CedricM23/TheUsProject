package com.TheUsProject.dao;

import java.util.List;
import java.util.UUID;
import com.TheUsProject.model.Bookmark;

public interface BookmarkDao {

    List<Bookmark> getBookmarksByUserId(UUID userId);

    Bookmark addBookmark(UUID userId, Bookmark bookmark);

    void removeBookmark(UUID userId, int tmdbMediaId, String mediaType);

    boolean isBookmarked(UUID userId, int tmdbMediaId, String mediaType);
}