package com.TheUsProject.dao;

import java.util.List;
import java.util.UUID;
import com.TheUsProject.model.Watched;

public interface WatchedDao {

    // Create
    Watched addToWatched(UUID userId, Watched watched);

    // // Read
    // List<Watched> getAllWatchedByUserId(UUID userId);
    Watched getWatchedById(int watchedId);
    Boolean isWatched(UUID userId, int tmdbMediaId, String mediaType);
     
    // int getTotalWatchedRuntimeByUserId(UUID userId);

    // // Delete
    // Watched removeFromWatched(UUID userId, int tmdbMediaId, String mediaType); 

}
    