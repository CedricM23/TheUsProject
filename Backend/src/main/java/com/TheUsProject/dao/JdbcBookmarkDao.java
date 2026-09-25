package com.TheUsProject.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import com.TheUsProject.exception.DaoException;
import com.TheUsProject.model.Bookmark;

@Component
public class JdbcBookmarkDao implements BookmarkDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcBookmarkDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Bookmark> getBookmarksByUserId(UUID userId) {
        List<Bookmark> bookmarks = new ArrayList<>();
        String sql = "SELECT bookmark_id, user_id, tmdb_media_id, media_type FROM bookmarks WHERE user_id = ?";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while (results.next()) {
                bookmarks.add(mapRowToBookmark(results));
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return bookmarks;
    }

    @Override
    public Bookmark addBookmark(UUID userId, Bookmark bookmark) {
        Bookmark newBookmark = null;
        String sql = "INSERT INTO bookmarks (user_id, tmdb_media_id, media_type) VALUES (?, ?, ?) RETURNING bookmark_id";

        try {
            int newId = jdbcTemplate.queryForObject(
                    sql,
                    int.class,
                    userId,
                    bookmark.getTmdbMediaId(),
                    bookmark.getMediaType());
            newBookmark = getBookmarkById(newId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
        return newBookmark;
    }

    @Override
    public void removeBookmark(UUID userId, int tmdbMediaId, String mediaType) {
        String sql = "DELETE FROM bookmarks WHERE user_id = ? AND tmdb_media_id = ? AND media_type = ?";
        try {
            // Update the parameters to match the new SQL string
            jdbcTemplate.update(sql, userId, tmdbMediaId, mediaType);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
    }

    @Override
    public boolean isBookmarked(UUID userId, int tmdbMediaId, String mediaType) {
        String sql = "SELECT COUNT(*) FROM bookmarks WHERE user_id = ? AND tmdb_media_id = ? AND media_type = ?";
        try {
            Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId, tmdbMediaId, mediaType);
            return count != null && count > 0;
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
    }

    private Bookmark getBookmarkById(int bookmarkId) {
        Bookmark bookmark = null;
        String sql = "SELECT bookmark_id, user_id, tmdb_media_id, media_type FROM bookmarks WHERE bookmark_id = ?";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, bookmarkId);
            if (results.next()) {
                bookmark = mapRowToBookmark(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return bookmark;
    }

    private Bookmark mapRowToBookmark(SqlRowSet rs) {
        Bookmark bookmark = new Bookmark();
        bookmark.setBookmarkId(rs.getInt("bookmark_id"));
        bookmark.setUserId(UUID.fromString(rs.getString("user_id")));
        bookmark.setTmdbMediaId(rs.getInt("tmdb_media_id"));
        bookmark.setMediaType(rs.getString("media_type"));
        return bookmark;
    }
}