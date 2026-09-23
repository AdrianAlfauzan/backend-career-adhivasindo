# Adhivasindo Backend API

Take Home Test Backend Developer — Adhivasindo.

REST API berbasis Node.js Express dengan database PostgreSQL, autentikasi JWT, dan pengambilan data real-time dari API eksternal.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Auth**: JSON Web Token (JWT)
- **HTTP Client**: Axios
- **API Docs**: Swagger UI (OpenAPI 3.0)

---

## Fitur

- Login dengan JWT
- CRUD User (Create, Read, Update, Delete)
- Pencarian data real-time dari https://bit.ly/48ejMhW
  - Berdasarkan NAMA
  - Berdasarkan NIM
  - Berdasarkan YMD (YYYYMMDD)
- Semua endpoint (kecuali login) dilindungi autentikasi JWT
- Dokumentasi interaktif dengan Swagger UI

---

## Persyaratan

- Node.js v18+
- PostgreSQL v14+
- npm

---

## Cara Menjalankan

### 1. Clone repository

```bash
git clone https://github.com/USERNAME/adhivasindo-backend.git
cd adhivasindo-backend
```
