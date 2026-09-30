package com.TheUsProject.dao;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import com.TheUsProject.exception.DaoException;
import com.TheUsProject.model.Watched;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class JdbcWatchedDao implements WatchedDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcWatchedDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // ==================
    // CREATE
    // ==================

    @Override
    public Watched addToWatched(UUID userId, Watched watched) {
        Watched newWatched = null;
        String SQL = "insert into watched (user_id, tmdb_media_id, media_type, runtime) \n" + //
                "  VALUES (?,?,?, ?) returning watched_id;";
        try {
            int newId = jdbcTemplate.queryForObject(
                    SQL,
                    int.class,
                    userId,
                    watched.getTmdbMediaId(),
                    watched.getMediaType(),
                    watched.getRuntime());
            newWatched = getWatchedById(newId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            System.out.println("DB Error Root Cause: " + e.getMostSpecificCause().getMessage());
            throw new DaoException("Data integrity violation", e);
        }
        return newWatched;
    }

    // ==================
    // READ
    // ==================

    public Watched getWatchedById(int watchedId) {
        Watched watched = null;
        String sql = "Select watched_id, user_id, tmdb_media_id, media_type, runtime FROM watched where watched_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, watchedId);
            if (results.next()) {
                watched = mapRowToWatched(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return watched;
    }

    public Boolean isWatched(UUID userId, int tmdbMediaId, String mediaType){
         String sql = "SELECT COUNT(*) FROM watched WHERE user_id = ? AND tmdb_media_id = ? AND media_type = ?";
          try {
            Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId, tmdbMediaId, mediaType);
            return count != null && count > 0;
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
    }

    // ==================
    // DELETE
    // ==================

    // ==================
    // ROW MAPPER
    // ==================

    private Watched mapRowToWatched(SqlRowSet rs) {
        Watched watched = new Watched();
        watched.setWatchedId(rs.getInt("watched_id"));
        watched.setUserId(UUID.fromString(rs.getString("user_id")));
        watched.setTmdbMediaId(rs.getInt("tmdb_media_id"));
        watched.setMediaType(rs.getString("media_type"));
        watched.setRuntime(rs.getInt("runtime"));
        return watched;
    }

}
