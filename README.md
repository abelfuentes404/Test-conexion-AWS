# Test-conexion-AWS# 🚀 AWS RDS PostgreSQL + Node.js + React Demo

Proyecto de demostración completo para video tutorial sobre cómo conectar una base de datos **PostgreSQL en AWS RDS** con un backend **Node.js/Express** y frontend **React + Vite + Tailwind CSS v4**.

![AWS](https://img.shields.io/badge/AWS-RDS-FF9900?style=flat&logo=amazon-aws)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)

## 📋 Contenido del Proyecto

- **Backend**: API REST con Node.js, Express, autenticación JWT y bcrypt
- **Frontend**: React + Vite + Tailwind CSS v4 con diseño moderno
- **Database**: Scripts SQL para PostgreSQL/AWS RDS
- **Features**: Registro, login, roles (admin/user), dashboard protegido

## 🏗️ Arquitectura



## 🚀 Instalación Rápida

### 1. Clonar repositorio

```bash
git clone https://github.com/abelfuentes404/Test-conexion-AWS.git
cd Test-conexion-AWS
```

### 2. Backend

```bash
cd server
npm install
```
# Configurar variables de entorno

```bash
cp .env.example .env
```
# Editar .env con tus credenciales de AWS RDS

### Variables de entorno (.env):

```bash
DB_HOST=tu-endpoint.amazonaws.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=tu-password-seguro

JWT_SECRET=tu_clave_secreta_jwt
PORT=5000
```

# Iniciar servidor
```bash
node server.js
```

# 🗄️ Configuración AWS RDS

# 📊 Estructura de la Base de Datos

```bash
Table: users
├── id (SERIAL PK)
├── username (VARCHAR 50, UNIQUE)
├── email (VARCHAR 100, UNIQUE)
├── password (VARCHAR 255) -- bcrypt hash
├── role (VARCHAR 20) -- 'user' | 'admin'
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

## 📚 Ejecutar script SQL

```bash
Test-conexion-AWS->database->init.sql
```

## 🔑 Credenciales de Prueba

```bash
| Rol     | Email            | Password   |
| ------- | ---------------- | ---------- |
| Admin   | `admin@demo.com` | `admin123` |
| Usuario | `user@demo.com`  | `user123`  |
```

# 🔧 API Endpoints

```bash
| Método | Endpoint             | Descripción          | Auth        |
| ------ | -------------------- | -------------------- | ----------- |
| POST   | `/api/auth/register` | Registrar usuario    | Público     |
| POST   | `/api/auth/login`    | Iniciar sesión       | Público     |
| GET    | `/api/auth/profile`  | Perfil del usuario   | JWT         |
| GET    | `/api/auth/users`    | Listar todos (admin) | JWT + Admin |
| GET    | `/api/health`        | Health check         | Público     |
```

# 🛠️ Tecnologías

Backend
Node.js + Express
PostgreSQL (pg)
JWT (jsonwebtoken)
bcryptjs (hashing)
cors + dotenv
Frontend
React 18
Vite (build tool)
React Router DOM
Tailwind CSS v4
Axios (HTTP client)
Database
PostgreSQL 15+
AWS RDS (hosting)

# 🔒 Seguridad
✅ Contraseñas hasheadas con bcrypt (10 rounds)
✅ Autenticación JWT con expiración (24h)
✅ Middleware de autorización por roles
✅ Validación de datos en backend
✅ CORS configurado
✅ SSL para conexiones AWS RDS