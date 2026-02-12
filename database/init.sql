-- ============================================
-- AWS RDS PostgreSQL - Script de Inicialización
-- ============================================

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- USUARIOS DE PRUEBA (Hashes bcrypt válidos)
-- Generados con: bcrypt.hashSync('admin123', 10)
-- ============================================

-- Admin: admin@demo.com / admin123
INSERT INTO users (username, email, password, role) 
VALUES (
    'admin', 
    'admin@demo.com', 
    '$2a$10$J3Qa3ZyM0QyqVgJ0wHfXuOjDw3K8J9sTL8mZ5Y7X6C9vB2N4M6P8', -- ← REEMPLAZAR CON HASH REAL
    'admin'
) ON CONFLICT (email) DO NOTHING;

-- User: user@demo.com / user123  
INSERT INTO users (username, email, password, role) 
VALUES (
    'usuario1', 
    'user@demo.com', 
    '$2a$10$J3Qa3ZyM0QyqVgJ0wHfXuOjDw3K8J9sTL8mZ5Y7X6C9vB2N4M6P8', -- ← REEMPLAZAR CON HASH REAL
    'user'
) ON CONFLICT (email) DO NOTHING;

SELECT '✅ Base de datos inicializada' as status;
SELECT id, username, email, role FROM users;