// package com.techelevator.dao;

// import com.techelevator.exception.DaoException;
// import com.techelevator.model.RegisterUserDto;
// import com.techelevator.model.User;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.springframework.jdbc.core.JdbcTemplate;

// import java.util.List;

// import static org.junit.jupiter.api.Assertions.*;

// public class JdbcUserDaoTest extends BaseDaoTest {
//     protected static final User USER_1 = new User(1, "user1", "user1", "ROLE_USER");
//     protected static final User USER_2 = new User(2, "user2", "user2", "ROLE_USER");
//     private static final User USER_3 = new User(3, "user3", "user3", "ROLE_USER");

//     private JdbcUserDao sut;

//     @BeforeEach
//     public void setup() {
//         JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
//         sut = new JdbcUserDao(jdbcTemplate);
//     }

//     @Test
//     public void getUserByUsername_given_null_throws_exception() {
//         try {
//             sut.getUserByUsername(null);
//         } catch (IllegalArgumentException e) {
//             // expected
//         } catch (Exception e) {
//             fail("Expected IllegalArgumentException");
//         }
//     }

//     @Test
//     public void getUserByUsername_given_invalid_username_returns_null() {
//         assertNull(sut.getUserByUsername("invalid"));
//     }

//     @Test
//     public void getUserByUsername_given_valid_user_returns_user() {
//         User actualUser = sut.getUserByUsername(USER_1.getUsername());

//         assertEquals(USER_1, actualUser);
//     }

//     @Test
//     public void getUserById_given_invalid_user_id_returns_null() {
//         User actualUser = sut.getUserById(-1);

//         assertNull(actualUser);
//     }

//     @Test
//     public void getUserById_given_valid_user_id_returns_user() {
//         User actualUser = sut.getUserById(USER_1.getId());

//         assertEquals(USER_1, actualUser);
//     }

//     @Test
//     public void getUsers_returns_all_users() {
//         List<User> users = sut.getUsers();

//         assertNotNull(users);
//         assertEquals(3, users.size());
//         assertEquals(USER_1, users.get(0));
//         assertEquals(USER_2, users.get(1));
//         assertEquals(USER_3, users.get(2));
//     }

//     @Test
//     public void createUser_with_null_username() {
//         try {
//             RegisterUserDto registerUserDto = new RegisterUserDto();
//             registerUserDto.setUsername(null);
//             registerUserDto.setPassword(USER_3.getPassword());
//             registerUserDto.setRole("ROLE_USER");
//             sut.createUser(registerUserDto);
//         } catch (DaoException e) {
//             // expected
//         } catch (Exception e) {
//             fail("Expected DaoException");
//         }
//     }

//     @Test
//     public void createUser_with_existing_username() {
//         try {
//             RegisterUserDto registerUserDto = new RegisterUserDto();
//             registerUserDto.setUsername(USER_1.getUsername());
//             registerUserDto.setPassword(USER_3.getPassword());
//             registerUserDto.setRole("ROLE_USER");
//             sut.createUser(registerUserDto);
//         } catch (DaoException e) {
//             // expected
//         } catch (Exception e) {
//             fail("Expected DaoException");
//         }
//     }

//     @Test
//     public void createUser_with_null_password() {
//         try {
//             RegisterUserDto registerUserDto = new RegisterUserDto();
//             registerUserDto.setUsername(USER_3.getUsername());
//             registerUserDto.setPassword(null);
//             registerUserDto.setRole("ROLE_USER");
//             sut.createUser(registerUserDto);
//         } catch (IllegalArgumentException e) {
//             // expected
//         } catch (Exception e) {
//             fail("Expected IllegalArgumentException");
//         }
//     }

//     @Test
//     public void createUser_creates_a_user() {
//         RegisterUserDto user = new RegisterUserDto();
//         user.setUsername("new");
//         user.setPassword("user");
//         user.setRole("ROLE_USER");
//         User createdUser = sut.createUser(user);

//         assertNotNull(createdUser);

//         User retrievedUser = sut.getUserByUsername(createdUser.getUsername());
//         assertEquals(retrievedUser, createdUser);
//     }
// }
