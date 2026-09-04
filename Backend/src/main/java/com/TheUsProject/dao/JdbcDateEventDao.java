package com.TheUsProject.dao;

import java.util.Arrays;
import java.util.UUID;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

import com.TheUsProject.exception.DaoException;
import com.TheUsProject.model.DateEvent;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

@Component
public class JdbcDateEventDao implements DateEventDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcDateEventDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // ========================================================================
    // Create
    // ========================================================================

    @Override
    public DateEvent CreateDateEvent(UUID userId, DateEvent dateEvent) {
        String sql = "INSERT INTO dateevents (" +
                "user_id, name, location, image_of_place, song, " +
                "article_title, date_time, description, scrapbook_image_caption) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) " +
                "RETURNING date_id;";

        try {
            UUID DateId = jdbcTemplate.queryForObject(
                    sql,
                    UUID.class,
                    userId,
                    dateEvent.getName(),
                    dateEvent.getLocation(),
                    dateEvent.getImageOfPlace(),
                    dateEvent.getSong(),
                    dateEvent.getArticleTitle(),
                    dateEvent.getDateTime(),
                    dateEvent.getDescription().toArray(new String[0]),
                    dateEvent.getScrapbookImageCaption());

            return getDateEventById(DateId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to database", e);

        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
    }

    // ========================================================================
    // Read
    // ========================================================================

    @Override
    public DateEvent getDateEventById(UUID dateId) {
        DateEvent dateEvent = null;
        String sql = "SELECT * FROM dateevents WHERE date_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, dateId);
            if (results.next()) {
                dateEvent = mapRowToDateEvent(results);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return dateEvent;
    }

    // ========================================================================
    // Delete
    // ========================================================================

    @Override
    public int deleteDateEventById(UUID dateId) {
        String sql = "DELETE FROM dateevents WHERE date_id = ?;";
        try {
            return jdbcTemplate.update(sql, dateId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
    }

    // --- Helper Method to map database rows to Java Objects ---
    private DateEvent mapRowToDateEvent(SqlRowSet rs) {
        DateEvent dateEvent = new DateEvent();
        dateEvent.setDateId(UUID.fromString(rs.getString("date_id")));
        dateEvent.setUserId(UUID.fromString(rs.getString("user_id")));
        dateEvent.setName(rs.getString("name"));
        dateEvent.setLocation(rs.getString("location"));
        dateEvent.setImageOfPlace(rs.getString("image_of_place"));
        dateEvent.setSong(rs.getString("song"));
        dateEvent.setArticleTitle(rs.getString("article_title"));
        dateEvent.setDateTime(rs.getString("date_time"));

        // Convert SQL Array back to Java List<String> safely
        try {
            java.sql.Array sqlArray = (java.sql.Array) rs.getObject("description");
            if (sqlArray != null) {
                String[] strArray = (String[]) sqlArray.getArray();
                dateEvent.setDescription(Arrays.asList(strArray));
            }
        } catch (Exception e) {
            throw new DaoException("Error parsing description array", e);
        }

        dateEvent.setScrapbookImageCaption(rs.getString("scrapbook_image_caption"));

        return dateEvent;
    }

}
