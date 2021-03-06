DROP TABLE IF EXISTS Photos;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Comments;

CREATE TABLE Categories (
	categoryId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	category VARCHAR(128) UNIQUE NOT NULL
);

CREATE TABLE Users (
	userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	firstName VARCHAR(128) NOT NULL,
	lastName VARCHAR(128) NOT NULL,
	email VARCHAR(128) UNIQUE NOT NULL,
	username VARCHAR(64) UNIQUE NOT NULL,
	password VARCHAR(256) NOT NULL,
	description VARCHAR(512),
	avatarUrl VARCHAR(512)
);

CREATE TABLE Photos (
	photoId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(128) NOT NULL,
	description VARCHAR(512),
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	url VARCHAR(512) NOT NULL,
	visibility VARCHAR(16) NOT NULL,
	rate INT DEFAULT 0,
	numRaters INT DEFAULT 0,
	userId INT NOT NULL,
	categoryId INT,
	FOREIGN KEY (userId) REFERENCES Users (userId),
	FOREIGN KEY (categoryId) REFERENCES Categories (categoryId),
	CONSTRAINT ValidVisibility CHECK (visibility in ('Public', 'Private'))
);

CREATE TABLE Comments(
	commentId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	comment VARCHAR(512) NOT NULL,
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	userId INT NOT NULL,
	photoId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (userId),
	FOREIGN KEY (photoId) REFERENCES Photos (photoId)
);

CREATE TABLE Rates(
	rateId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	userId INT NOT NULL,
	photoId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (userId),
	FOREIGN KEY (photoId) REFERENCES Photos (photoId),
	CONSTRAINT user_rating_2_times UNIQUE (userId, photoId)
);

-- Create the rest of your tables...