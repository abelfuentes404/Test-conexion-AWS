-- ============================================
-- AWS RDS PostgreSQL - Script de Inicialización
-- Video Tutorial: Conexión AWS RDS + Node.js + React
-- ============================================

-- 1. CREAR BASE DE DATOS (ejecutar como superusuario si es necesario)
-- CREATE DATABASE aws_demo_db;

-- Conectar a la base de datos
-- \c aws_demo_db;

-- ============================================
-- 2. TABLA DE USUARIOS
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

-- ============================================
-- 3. ÍNDICES PARA BÚSQUEDAS FRECUENTES
-- ============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- 4. FUNCIÓN PARA ACTUALIZAR updated_at AUTOMÁTICAMENTE
-- ============================================
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
-- 5. DATOS DE PRUEBA
-- ============================================

-- Usuario Admin (password: admin123)
-- Hash generado con bcrypt (10 rounds)
INSERT INTO users (username, email, password, role) 
VALUES (
    'admin', 
    'admin@demo.com', 
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- admin123
    'admin'
) ON CONFLICT (email) DO NOTHING;

-- Usuario Regular (password: user123)
INSERT INTO users (username, email, password, role) 
VALUES (
    'usuario1', 
    'user@demo.com', 
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- user123
    'user'
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- 6. VERIFICACIÓN
-- ============================================
SELECT '✅ Tabla users creada exitosamente' as status;
SELECT COUNT(*) as total_usuarios FROM users;
SELECT id, username, email, role, created_at FROM users;

-- ============================================
-- NOTAS PARA AWS RDS:
-- ============================================
-- 1. Security Group: Permitir tráfico entrante en puerto 5432 desde tu IP
-- 2. Public Accessibility: Habilitar si accedes desde fuera de VPC
-- 3. Usar SSL en conexiones de producción: sslmode=require
-- 4. Endpoint: encontrar en consola AWS RDS > Databases > tu-instancia
-- 5. Master username: postgres (o el que configuraste)
-- 6. Master password: la contraseña que definiste al crear la instancia