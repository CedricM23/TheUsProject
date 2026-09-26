// MediaListItem.java
package com.TheUsProject.model;

public class MediaListItem {
    private int itemId;
    private int listId;
    private int tmdbMediaId;
    private String mediaType;

    public MediaListItem() {
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public int getListId() {
        return listId;
    }

    public void setListId(int listId) {
        this.listId = listId;
    }

    public int getTmdbMediaId() {
        return tmdbMediaId;
    }

    public void setTmdbMediaId(int tmdbMediaId) {
        this.tmdbMediaId = tmdbMediaId;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    @Override
    public String toString() {
        return "MediaListItem{" +
                "itemId=" + itemId +
                ", listId=" + listId +
                ", tmdbMediaId=" + tmdbMediaId +
                ", mediaType='" + mediaType + '\'' +
                '}';
    }
}