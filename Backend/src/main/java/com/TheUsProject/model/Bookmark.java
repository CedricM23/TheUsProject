package com.TheUsProject.model;

import java.util.UUID;

public class Bookmark {

    private int bookmarkId;
    private UUID userId;
    private int tmdbMediaId;
    private String mediaType;

    public Bookmark() {
    }

    public Bookmark(int bookmarkId, UUID userId, int tmdbMediaId, String mediaType) {
        this.bookmarkId = bookmarkId;
        this.userId = userId;
        this.tmdbMediaId = tmdbMediaId;
        this.mediaType = mediaType;
    }

    public int getBookmarkId() {
        return bookmarkId;
    }

    public void setBookmarkId(int bookmarkId) {
        this.bookmarkId = bookmarkId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public int getTmdbMediaId() {
        return tmdbMediaId;
    }

    public void setTmdbMediaId(int tmdbMediaId) {
        this.tmdbMediaId = tmdbMediaId;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    @Override
    public String toString() {
        return "Bookmark{" +
                "bookmarkId=" + bookmarkId +
                ", userId=" + userId +
                ", tmdbMediaId=" + tmdbMediaId +
                ", mediaType='" + mediaType + '\'' +
                '}';
    }
}