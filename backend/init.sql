CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT, role TEXT DEFAULT 'viewer', phone TEXT, created_at DATETIME);
CREATE TABLE IF NOT EXISTS nurseries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, slug TEXT, address TEXT, contact_email TEXT, contact_phone TEXT, description TEXT, created_at DATETIME);
CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, message TEXT, created_at DATETIME);
CREATE TABLE IF NOT EXISTS species (id INTEGER PRIMARY KEY AUTOINCREMENT, scientific_name TEXT, common_name TEXT, origin TEXT);
CREATE TABLE IF NOT EXISTS batches (id INTEGER PRIMARY KEY AUTOINCREMENT, nursery_id INTEGER, species_id INTEGER, batch_code TEXT, sowing_date DATE, propagation_method TEXT, quantity_planted INTEGER, current_stock INTEGER, status TEXT, created_at DATETIME);
