# C21 - Testing en la Libreria

Copia de C20 con Vitest configurado en frontend y backend.

## Frontend

Desde esta carpeta:

```bash
npm install
npm test
npm run build
```

Los tests frontend cubren la transformacion del schema `libroSchema` y el comportamiento visible de `Header` para visitante, CLIENTE y ADMIN.

## Backend sin DB

Desde `backend/`:

```bash
npm install
npx prisma generate
npm test
npx tsc --noEmit
```

Esta suite cubre schemas Zod, `authorize` y `authenticate` con mocks, y la matriz de permisos de libros con Supertest. Estos casos responden antes de llegar a Prisma, por lo que no necesitan PostgreSQL.

## Backend con DB

Los tests que requieren datos del seed estan separados en `src/routes/auth.routes.db.test.ts`.

1. Copiar `backend/.env.example` a `backend/.env` y completar las variables locales.
2. Levantar PostgreSQL y la API:

```bash
docker compose up -d db api
```

3. Si la base aún no tiene tablas o datos, inicializá la BD y el seed:

```bash
cd backend
npm run db:setup
npm run test:db
```

El contenedor `api` de Docker ya ejecuta `prisma db push` y `tsx prisma/seed.ts` al arrancar, así que no hace falta correr el seed manualmente después de `docker compose up -d db api`.

Las credenciales esperadas por el test son `cliente@libreria.test` y `Cliente1234`.
