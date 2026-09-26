package com.TheUsProject.dao;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import com.TheUsProject.exception.DaoException;
import com.TheUsProject.model.MediaList;
import com.TheUsProject.model.MediaListItem;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class JdbcMediaListDao implements MediaListDao {

    private final JdbcTemplate jdbcTemplate;

    public JdbcMediaListDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public MediaList createList(UUID userId, String listName) {
        String sql = "INSERT INTO media_lists (user_id, list_name) VALUES (?, ?) RETURNING list_id";
        try {
            int newId = jdbcTemplate.queryForObject(sql, int.class, userId, listName);
            return getListById(newId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to database", e);
        }
    }

    @Override
    public List<MediaList> getListsByUserId(UUID userId) {
        List<MediaList> lists = new ArrayList<>();
        String sql = "SELECT list_id, user_id, list_name FROM media_lists WHERE user_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
        while (results.next()) {
            lists.add(mapRowToMediaList(results));
        }
        return lists;
    }

    @Override
    public MediaList getListById(int listId) {
        String sql = "SELECT list_id, user_id, list_name FROM media_lists WHERE list_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, listId);
        if (results.next()) {
            return mapRowToMediaList(results);
        }
        return null;
    }

    @Override
    public void deleteList(UUID userId, int listId) {
        // Must delete the items first due to foreign key constraints, then delete the list
        String deleteItemsSql = "DELETE FROM media_list_items WHERE list_id = (SELECT list_id FROM media_lists WHERE list_id = ? AND user_id = ?)";
        String deleteListSql = "DELETE FROM media_lists WHERE list_id = ? AND user_id = ?";
        
        jdbcTemplate.update(deleteItemsSql, listId, userId);
        jdbcTemplate.update(deleteListSql, listId, userId);
    }

    @Override
    public void addItemToList(int listId, int tmdbMediaId, String mediaType) {
        String sql = "INSERT INTO media_list_items (list_id, tmdb_media_id, media_type) VALUES (?, ?, ?)";
        try {
            jdbcTemplate.update(sql, listId, tmdbMediaId, mediaType);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Item already exists in list or invalid list ID", e);
        }
    }

    @Override
    public void removeItemFromList(int listId, int tmdbMediaId, String mediaType) {
        String sql = "DELETE FROM media_list_items WHERE list_id = ? AND tmdb_media_id = ? AND media_type = ?";
        jdbcTemplate.update(sql, listId, tmdbMediaId, mediaType);
    }

    @Override
    public List<MediaListItem> getListItems(int listId) {
        List<MediaListItem> items = new ArrayList<>();
        String sql = "SELECT item_id, list_id, tmdb_media_id, media_type FROM media_list_items WHERE list_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, listId);
        while (results.next()) {
            MediaListItem item = new MediaListItem();
            item.setItemId(results.getInt("item_id"));
            item.setListId(results.getInt("list_id"));
            item.setTmdbMediaId(results.getInt("tmdb_media_id"));
            item.setMediaType(results.getString("media_type"));
            items.add(item);
        }
        return items;
    }

    private MediaList mapRowToMediaList(SqlRowSet rs) {
        MediaList list = new MediaList();
        list.setListId(rs.getInt("list_id"));
        list.setUserId(UUID.fromString(rs.getString("user_id")));
        list.setListName(rs.getString("list_name"));
        return list;
    }
}