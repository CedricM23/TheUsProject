package com.TheUsProject.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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

    @Override
    public List<DateEvent> getDateEventsByUserId(UUID userId) {
        List<DateEvent> dateEvents = new ArrayList<>();
        String sql = "SELECT * FROM dateevents WHERE user_id = ?;";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while (results.next()) {
                dateEvents.add(mapRowToDateEvent(results));
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return dateEvents;
    }


    // ========================================================================
    // Update
    // ========================================================================

    @Override
    public DateEvent updateDateEvent(DateEvent dateEvent) {
        String sql = "UPDATE dateevents " +
                "SET name = ?, location = ?, image_of_place = ?, song = ?, " +
                "article_title = ?, date_time = ?, description = ?, scrapbook_image_caption = ? " +
                "WHERE date_id = ?;";

        try {
            // Null check for the description array to prevent NullPointerExceptions during update
            Object[] descriptionArray = dateEvent.getDescription() != null 
                ? dateEvent.getDescription().toArray(new String[0]) 
                : new String[0];

            jdbcTemplate.update(
                    sql,
                    dateEvent.getName(),
                    dateEvent.getLocation(),
                    dateEvent.getImageOfPlace(),
                    dateEvent.getSong(),
                    dateEvent.getArticleTitle(),
                    dateEvent.getDateTime(),
                    descriptionArray,
                    dateEvent.getScrapbookImageCaption(),
                    dateEvent.getDateId());
                    
            return getDateEventById(dateEvent.getDateId());
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to database", e);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
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

        try {
            Object dbObj = rs.getObject("description");
            if (dbObj instanceof java.sql.Array) {
                java.sql.Array sqlArray = (java.sql.Array) dbObj;

                Object[] objArray = (Object[]) sqlArray.getArray();

                List<String> descriptionList = new ArrayList<>();
                for (Object obj : objArray) {
                    if (obj != null) {
                        descriptionList.add(obj.toString());
                    }
                }
                dateEvent.setDescription(descriptionList);
            }
        } catch (Exception e) {
            throw new DaoException("Error parsing description array", e);
        }

        dateEvent.setScrapbookImageCaption(rs.getString("scrapbook_image_caption"));

        return dateEvent;
    }

}
