# Book API

Aplikasi API untuk pengolahan data buku sebagai pengerjaan Test Backend.

## Deskripsi

Book API adalah aplikasi backend berbasis Node.js yang dirancang untuk mengelola data buku dan autentikasi pengguna. Dibangun menggunakan Express.js dengan database MariaDB dan Sequelize ORM.

## Fitur Utama

- Autentikasi pengguna dengan JWT
- Operasi CRUD untuk data buku
- API dengan design RESTful

## Teknologi

- Node.js & Express
- MariaDB & Sequelize
- JWT dan bcryptjs
- Jest & Supertest untuk testing

## Cara Instalasi

1. Clone repository:
   ```bash
   git clone https://github.com/username/bookapi.test.git
   cd bookapi.test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Siapkan file .env:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=password_anda
   DB_NAME=book_api
   JWT_SECRET=secret_key_anda
   ```

4. Jalankan server:
   ```bash
   npm start
   ```

## Pengembangan

Jalankan server dengan nodemon:
```bash
npm run dev
```

## Testing

Jalankan test dengan Jest:
```bash
npm test
```

## Lisensi

Proyek ini dilisensikan di bawah Lisensi ISC.

## Pembuat

- **Kurniawansyah**