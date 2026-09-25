package com.TheUsProject.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import com.TheUsProject.exception.DaoException;
import com.TheUsProject.model.Favorite;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

@Component 
public class JdbcFavoriteDao implements FavoriteDao{

      private final JdbcTemplate jdbcTemplate;

    public JdbcFavoriteDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Favorite> getFavoritesByUserId(UUID userId) {
        List<Favorite> favorites = new ArrayList<>();
        String sql = "SELECT favorite_id, user_id, tmdb_media_id, media_type FROM favorites WHERE user_id = ?";
        
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while (results.next()) {
                favorites.add(mapRowToFavorite(results));
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return favorites;
    }

    @Override
    public boolean isFavorite(UUID userId, int tmdbMediaId, String mediaType) {
        String sql = "SELECT COUNT(*) FROM favorites WHERE user_id = ? AND tmdb_media_id = ? AND media_type = ?";
        
        try {
            // queryForObject with Integer.class counts the matching rows
            Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId, tmdbMediaId, mediaType);
            return count != null && count > 0;
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
    }

    @Override
    public Favorite addFavorite(UUID userId, Favorite favorite) {
        Favorite newFavorite = null;
        String sql = "INSERT INTO favorites (user_id, tmdb_media_id, media_type) VALUES (?, ?, ?) RETURNING favorite_id";
        
        try {
            int newId = jdbcTemplate.queryForObject(
                sql, 
                int.class,
                userId, 
                favorite.getTmdbMediaId(), 
                favorite.getMediaType()
            );
            newFavorite = getFavoriteById(newId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
        return newFavorite;
    }

   @Override
    public void removeFavorite(UUID userId, int tmdbMediaId, String mediaType) {
        String sql = "DELETE FROM favorites WHERE user_id = ? AND tmdb_media_id = ? AND media_type = ?";
        try {
            jdbcTemplate.update(sql, userId, tmdbMediaId, mediaType);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
    }



    private Favorite getFavoriteById(int favoriteId) {
        Favorite favorite = null;
        String sql = "SELECT favorite_id, user_id, tmdb_media_id, media_type FROM favorites WHERE favorite_id = ?";
        
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, favoriteId);
            if (results.next()) {
                favorite = mapRowToFavorite(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return favorite;
    }

    private Favorite mapRowToFavorite(SqlRowSet rs) {
        Favorite favorite = new Favorite();
        favorite.setFavoriteId(rs.getInt("favorite_id"));
        
        // Converts the Postgres string back into a Java UUID object
        favorite.setUserId(UUID.fromString(rs.getString("user_id")));
        
        favorite.setTmdbMediaId(rs.getInt("tmdb_media_id"));
        favorite.setMediaType(rs.getString("media_type"));
        return favorite;
    }

}
