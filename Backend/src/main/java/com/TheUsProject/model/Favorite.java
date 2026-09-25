package com.TheUsProject.model;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class Favorite {

    private int favoriteId;
    private UUID userId;
    private int tmdbMediaId;
    private String mediaType;

    public Favorite() {
    }

    // All-argument constructor
    public Favorite(int favoriteId, UUID userId, int tmdbMediaId, String mediaType) {
        this.favoriteId = favoriteId;
        this.userId = userId;
        this.tmdbMediaId = tmdbMediaId;
        this.mediaType = mediaType;
    }

    // Getters and Setters
    public int getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(int favoriteId) {
        this.favoriteId = favoriteId;
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
        return "Favorite{" +
                "favoriteId=" + favoriteId +
                ", userId=" + userId +
                ", tmdbMediaId=" + tmdbMediaId +
                ", mediaType='" + mediaType + '\'' +
                '}';
    }
}