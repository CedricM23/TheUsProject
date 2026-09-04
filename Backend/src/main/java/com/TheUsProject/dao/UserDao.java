package com.TheUsProject.dao;

import java.util.List;
import java.util.UUID;

import com.TheUsProject.model.RegisterUserDto;
import com.TheUsProject.model.User;

public interface UserDao {

    List<User> getUsers();

    User getUserById(UUID id);

    User getUserByUsername(String username);

    User createUser(RegisterUserDto user);
}
