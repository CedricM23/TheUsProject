package com.TheUsProject.dao;

import java.util.List;
import java.util.UUID;
import com.TheUsProject.model.Favorite;

public interface FavoriteDao {

    /**
     * Retrieves a list of all favorites for a specific user.
     * 
     * @param userId the UUID of the user
     * @return a List of Favorite objects
     */
    List<Favorite> getFavoritesByUserId(UUID userId);

    /**
     * Checks if a specific media item is already in a user's favorites.
     * 
     * @param userId      the UUID of the user
     * @param tmdbMediaId the TMDB ID of the media
     * @param mediaType   the type of media ("movie" or "tv")
     * @return true if it exists, false otherwise
     */
    boolean isFavorite(UUID userId, int tmdbMediaId, String mediaType);

    /**
     * Adds a new favorite to the database.
     * 
     * @param userId   the UUID of the user saving the favorite
     * @param favorite the Favorite object containing TMDB ID and media type
     * @return the newly created Favorite object with its generated favorite_id
     */
    Favorite addFavorite(UUID userId, Favorite favorite);

    /**
     * Removes a favorite from the database securely by verifying ownership.
     * 
     * @param userId the UUID of the user attempting to delete the favorite
     * @param tmdbMediaId the TMDB ID of the media to remove
     * @param mediaType the type of media ("movie" or "tv")
     */
    void removeFavorite(UUID userId, int tmdbMediaId, String mediaType);

}