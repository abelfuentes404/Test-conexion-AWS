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
git clone https://github.com/tu-usuario/aws-rds-demo.git
cd aws-rds-demo
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