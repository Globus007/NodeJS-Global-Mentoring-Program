CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users
(
    id       uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    login    TEXT NOT NULL,
    password TEXT,
    age      INTEGER,
    deleted  BOOLEAN          default false
);

INSERT INTO users(login, password, age)
VALUES ('user1', 'dae02b85ea895e68969691733fd8e8e2d0a1204eb689fcbaa4894fbbfde629a6', 25),
       ('user2', 'b180d926ad0c1ed197426e44761cfdfdfa8f3b3e3ff9981435f55a1a1cb6cc4d', 30),
       ('user3', '1b132bff3ae4312a0f1dab6c29a51a0dd4325bcb0fd40e8a25b57ae5f550dd84', 31),
       ('user4', '450e215fc37491cef683431114ed87b95b186462b1ebaa0a6929f719291ca923', 33);


CREATE TYPE PERMISSION as enum ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

CREATE TABLE IF NOT EXISTS groups
(
    id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        TEXT NOT NULL,
    permissions PERMISSION[]
);
