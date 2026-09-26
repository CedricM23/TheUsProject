// MediaList.java
package com.TheUsProject.model;

import java.util.UUID;

public class MediaList {
    private int listId;
    private UUID userId;
    private String listName;

    public MediaList() {
    }

    public int getListId() {
        return listId;
    }

    public void setListId(int listId) {
        this.listId = listId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    @Override
    public String toString() {
        return "MediaList{" +
                "listId=" + listId +
                ", userId=" + userId +
                ", listName='" + listName + '\'' +
                '}';
    }

}