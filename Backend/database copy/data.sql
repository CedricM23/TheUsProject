BEGIN TRANSACTION;

-- the password for both users is "password"
INSERT INTO users (username,password_hash,first_name, last_name, role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','Testuser','Testuser','ROLE_USER');
INSERT INTO users (username,password_hash,first_name, last_name, role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','Admin','Admin','ROLE_ADMIN');

COMMIT TRANSACTION;
