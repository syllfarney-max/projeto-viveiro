-- quick reference: more tables can be added later
CREATE TABLE users ( id SERIAL PRIMARY KEY, name TEXT, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, role TEXT DEFAULT 'admin', created_at TIMESTAMP DEFAULT NOW() );
CREATE TABLE messages ( id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL, created_at TIMESTAMP DEFAULT NOW() );
CREATE TABLE nurseries ( id SERIAL PRIMARY KEY, name TEXT NOT NULL, slug TEXT UNIQUE, address TEXT, contact_email TEXT, contact_phone TEXT, description TEXT, created_at TIMESTAMP DEFAULT NOW() );
