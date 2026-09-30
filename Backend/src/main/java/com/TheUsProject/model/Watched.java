package com.TheUsProject.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(
    name = "watched",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "tmdb_media_id", "media_type"})
    }
)
public class Watched {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "watched_id")
    private int watchedId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "tmdb_media_id", nullable = false)
    private Integer tmdbMediaId;

    @Column(name = "media_type", nullable = false, length = 10)
    private String mediaType;

    @Column(name = "runtime")
    private Integer runtime;

    public Watched() {}

    // Parameterized constructor
    public Watched(UUID userId, Integer tmdbMediaId, String mediaType, Integer runtime) {
        this.userId = userId;
        this.tmdbMediaId = tmdbMediaId;
        this.mediaType = mediaType;
        this.runtime = runtime;
    }

    // Getters and Setters
    public int getWatchedId() {
        return watchedId;
    }

    public void setWatchedId(int watchedId) {
        this.watchedId = watchedId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public Integer getTmdbMediaId() {
        return tmdbMediaId;
    }

    public void setTmdbMediaId(Integer tmdbMediaId) {
        this.tmdbMediaId = tmdbMediaId;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public void setRuntime(Integer runtime) {
        this.runtime = runtime;
    }
}