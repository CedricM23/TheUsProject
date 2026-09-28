// package com.TheUsProject.model;

// import jakarta.persistence.*;
// import java.time.LocalDate;

// @Entity
// @Table(name = "user_preferences")
// public class UserPreferences {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String appTitle = "TheUsProject";
    
//     private String partnerName;
    
//     private LocalDate anniversaryDate;
    
//     private String defaultLocation;
    
//     private String theme = "light";
    
//     private String defaultDateView = "fancy";
    
//     private String accentColor = "pink";
    
//     private String ourSong;

//     @OneToOne
//     @JoinColumn(name = "user_id", referencedColumnName = "id")
//     private User user;

//     public UserPreferences() {
//     }

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getAppTitle() {
//         return appTitle;
//     }

//     public void setAppTitle(String appTitle) {
//         this.appTitle = appTitle;
//     }

//     public String getPartnerName() {
//         return partnerName;
//     }

//     public void setPartnerName(String partnerName) {
//         this.partnerName = partnerName;
//     }

//     public LocalDate getAnniversaryDate() {
//         return anniversaryDate;
//     }

//     public void setAnniversaryDate(LocalDate anniversaryDate) {
//         this.anniversaryDate = anniversaryDate;
//     }

//     public String getDefaultLocation() {
//         return defaultLocation;
//     }

//     public void setDefaultLocation(String defaultLocation) {
//         this.defaultLocation = defaultLocation;
//     }

//     public String getTheme() {
//         return theme;
//     }

//     public void setTheme(String theme) {
//         this.theme = theme;
//     }

//     public String getDefaultDateView() {
//         return defaultDateView;
//     }

//     public void setDefaultDateView(String defaultDateView) {
//         this.defaultDateView = defaultDateView;
//     }

//     public String getAccentColor() {
//         return accentColor;
//     }

//     public void setAccentColor(String accentColor) {
//         this.accentColor = accentColor;
//     }

//     public String getOurSong() {
//         return ourSong;
//     }

//     public void setOurSong(String ourSong) {
//         this.ourSong = ourSong;
//     }

//     public User getUser() {
//         return user;
//     }

//     public void setUser(User user) {
//         this.user = user;
//     }

// }