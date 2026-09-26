BEGIN TRANSACTION;

-- Drop child tables before parent tables to avoid foreign key violation errors
DROP TABLE IF EXISTS media_list_items;
DROP TABLE IF EXISTS media_lists;
DROP TABLE IF EXISTS dateevents;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS bookmarks;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id UUID DEFAULT gen_random_uuid(),
    username varchar(50) NOT NULL UNIQUE,
    password_hash varchar(200) NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role varchar(50) NOT NULL,
    CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE dateevents (
    date_id UUID DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    location TEXT,
    image_of_place VARCHAR(255),
    song VARCHAR(255),
    article_title VARCHAR(150),
    date_time VARCHAR(50),
    description TEXT[],
    scrapbook_image_caption VARCHAR(255),
    
    CONSTRAINT PK_date PRIMARY KEY (date_id),
    CONSTRAINT FK_date_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE favorites (
    favorite_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    tmdb_media_id INT NOT NULL,
    media_type VARCHAR(10) NOT NULL,
  
    CONSTRAINT FK_favorites_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE bookmarks (
    bookmark_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    tmdb_media_id INT NOT NULL,
    media_type VARCHAR(10) NOT NULL,
  
    CONSTRAINT FK_bookmarks_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE media_lists (
    list_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL, 
    list_name VARCHAR(100) NOT NULL,
    
    CONSTRAINT FK_media_lists_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE media_list_items (
    item_id SERIAL PRIMARY KEY,
    list_id INT NOT NULL,
    tmdb_media_id INT NOT NULL,
    media_type VARCHAR(20) NOT NULL,
    
    CONSTRAINT FK_media_list_items_list FOREIGN KEY (list_id) REFERENCES media_lists(list_id) ON DELETE CASCADE,
    CONSTRAINT UQ_list_item UNIQUE (list_id, tmdb_media_id, media_type)
);

COMMIT TRANSACTION;