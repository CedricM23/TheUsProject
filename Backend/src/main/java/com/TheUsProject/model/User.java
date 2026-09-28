package com.TheUsProject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import jakarta.persistence.*;

public class User {

   private UUID id;
   private String username;
   @JsonIgnore
   private String password;
   @JsonIgnore
   private String firstname;
   private String lastname;
   private String email;
   private String imagePath;
   private LocalDateTime createdAt;
   private boolean activated;
   private Set<Authority> authorities = new HashSet<>();

   // @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
   // private UserPreferences preferences;

   public User() {
   }

   public User(UUID id, String username, String password, String firstname, String lastname, String email, String imagePath, String authorities) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.imagePath = imagePath;
      if (authorities != null)
         this.setAuthorities(authorities);
      this.activated = true;
   }

   public UUID getId() {
      return id;
   }

   public void setId(UUID id) {
      this.id = id;
   }

   public String getUsername() {
      return username;
   }

   public void setUsername(String username) {
      this.username = username;
   }

   public String getPassword() {
      return password;
   }

   public void setPassword(String password) {
      this.password = password;
   }

   public String getFirstName() {
      return firstname;
   }

   public void setFirstName(String firstname) {
      this.firstname = firstname;
   }

   public String getLastName() {
      return lastname;
   }

   public void setLastName(String lastname) {
      this.lastname = lastname;
   }

   public String getEmail() {
      return email;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public String getImagePath() {
      return imagePath;
   }

   public void setImagePath(String imagePath) {
      this.imagePath = imagePath;
   }

   public LocalDateTime getCreatedAt() {
      return createdAt;
   }

   public void setCreatedAt(LocalDateTime createdAt) {
      this.createdAt = createdAt;
   }

   public boolean isActivated() {
      return activated;
   }

   public void setActivated(boolean activated) {
      this.activated = activated;
   }

   public Set<Authority> getAuthorities() {
      return authorities;
   }

   public void setAuthorities(Set<Authority> authorities) {
      this.authorities = authorities;
   }

   public void setAuthorities(String authorities) {
      String[] roles = authorities.split(",");
      for (String role : roles) {
         String authority = role.contains("ROLE_") ? role : "ROLE_" + role;
         this.authorities.add(new Authority(authority));
      }
   }

   // public UserPreferences getPreferences() {
   //    return preferences;
   // }

   // public void setPreferences(UserPreferences preferences) {
   //    this.preferences = preferences;
   // }

   @Override
   public boolean equals(Object o) {
      if (this == o)
         return true;
      if (o == null || getClass() != o.getClass())
         return false;
      User user = (User) o;
      return activated == user.activated &&
            Objects.equals(id, user.id) && // Fixed from id == user.id
            Objects.equals(username, user.username) &&
            Objects.equals(password, user.password) &&
            Objects.equals(authorities, user.authorities);
   }

   @Override
   public int hashCode() {
      return Objects.hash(id, username, password, activated, authorities);
   }

   @Override
   public String toString() {
      return "User{" +
            "id=" + id +
            ", username='" + username + '\'' +
            ", firstname='" + firstname + '\'' +
            ", lastname='" + lastname + '\'' +
            ", email='" + email + '\'' +
            ", imagePath='" + imagePath + '\'' +
            ", createdAt=" + createdAt +
            ", activated=" + activated +
            ", authorities=" + authorities +
            '}';
   }
}