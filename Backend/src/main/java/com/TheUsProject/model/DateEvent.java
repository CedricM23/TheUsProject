package com.TheUsProject.model;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class DateEvent {

    private UUID dateId;
    private UUID userId;
    private String name;
    private String location;
    private String imageOfPlace;
    private String song;
    private String articleTitle;
    private String dateTime;
    private List<String> description;
    private String scrapbookImageCaption;

    public DateEvent() {
    }

    // All-argument constructor
    public DateEvent(UUID dateId, UUID userId, String name, String location, String imageOfPlace,
            String song, String articleTitle, String dateTime,
            List<String> description, String scrapbookImageCaption) {
        this.dateId = dateId;
        this.userId = userId;
        this.name = name;
        this.location = location;
        this.imageOfPlace = imageOfPlace;
        this.song = song;
        this.articleTitle = articleTitle;
        this.dateTime = dateTime;
        this.description = description;
        this.scrapbookImageCaption = scrapbookImageCaption;
    }

    // --- Getters and Setters ---

    public UUID getDateId() {
        return dateId;
    }

    public void setDateId(UUID dateId) {
        this.dateId = dateId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImageOfPlace() {
        return imageOfPlace;
    }

    public void setImageOfPlace(String imageOfPlace) {
        this.imageOfPlace = imageOfPlace;
    }

    public String getSong() {
        return song;
    }

    public void setSong(String song) {
        this.song = song;
    }

    public String getArticleTitle() {
        return articleTitle;
    }

    public void setArticleTitle(String articleTitle) {
        this.articleTitle = articleTitle;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public List<String> getDescription() {
        return description;
    }

    public void setDescription(List<String> description) {
        this.description = description;
    }

    public String getScrapbookImageCaption() {
        return scrapbookImageCaption;
    }

    public void setScrapbookImageCaption(String scrapbookImageCaption) {
        this.scrapbookImageCaption = scrapbookImageCaption;
    }

    // --- Equals and HashCode ---

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        DateEvent dateEvent = (DateEvent) o;
        return Objects.equals(dateId, dateEvent.dateId) &&
                Objects.equals(userId, dateEvent.userId) &&
                Objects.equals(name, dateEvent.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dateId, userId, name);
    }

    @Override
    public String toString() {
        return "DateEvent{" +
                "dateId=" + dateId +
                ", userId=" + userId +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", imageOfPlace='" + imageOfPlace + '\'' +
                ", song='" + song + '\'' +
                ", articleTitle='" + articleTitle + '\'' +
                ", dateTime='" + dateTime + '\'' +
                ", description=" + description +
                ", scrapbookImageCaption='" + scrapbookImageCaption + '\'' +
                '}';
    }
}