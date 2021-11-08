CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users(
	id			uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	login       TEXT NOT NULL,
	password	TEXT,
	age         INTEGER,
	isDeleted	BOOLEAN default false
 );

INSERT INTO users(login, password, age)
 VALUES ('user1', 'password123', 25),
 		('user2', 'password345', 30),
        ('user3', 'password67', 31),
        ('user4', 'password555', 33);
