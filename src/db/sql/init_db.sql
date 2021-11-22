CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users
(
    id          UUID PRIMARY KEY         DEFAULT uuid_generate_v4(),
    login       VARCHAR(255)             NOT NULL UNIQUE,
    password    CHAR(64),
    age         INTEGER,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TYPE PERMISSION as enum ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

CREATE TABLE IF NOT EXISTS groups
(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(255)             NOT NULL,
    permissions PERMISSION[],
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_group
(
    "userId"    uuid                     NOT NULL REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    "groupId"   uuid                     NOT NULL REFERENCES groups (id) ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);
