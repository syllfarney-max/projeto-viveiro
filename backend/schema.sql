-- PostgreSQL schema (see README)
CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT, role TEXT NOT NULL DEFAULT 'viewer', phone TEXT, created_at TIMESTAMP DEFAULT now());
CREATE TABLE nurseries (id SERIAL PRIMARY KEY, name TEXT NOT NULL, slug TEXT UNIQUE, address TEXT, contact_email TEXT, contact_phone TEXT, description TEXT, created_at TIMESTAMP DEFAULT now());
CREATE TABLE messages (id SERIAL PRIMARY KEY, name TEXT, email TEXT, message TEXT, created_at TIMESTAMP DEFAULT now());
