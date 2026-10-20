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

## Deploy individual (C23)

La actividad individual se despliega con un PostgreSQL de Neon, un Web Service
para `backend/` y un Static Site para este frontend en Render.

### Backend en Render

- Root Directory: `ejercicios/c21-testing/backend`
- Runtime: Docker
- Dockerfile: `Dockerfile.prod`
- Variables: `DATABASE_URL`, `JWT_SECRET` y `FRONTEND_URL`
- `PORT` lo provee Render

`DATABASE_URL` debe ser la URL directa de Neon con `sslmode=require` (no la
URL del pooler si la migración falla). Al iniciar, el contenedor aplica las
migraciones y ejecuta el seed idempotente antes de levantar la API.
`JWT_SECRET` se genera en Render y no se publica en el repositorio.

### Frontend en Render

- Root Directory: `ejercicios/c21-testing`
- Tipo: Static Site
- Build command: `npm run build`
- Publish directory: `dist`
- Variable: `VITE_API_URL=https://<backend>.onrender.com/api`
- Rewrite: `/*` hacia `/index.html`

Después de crear el frontend:

1. Actualizar `FRONTEND_URL` del backend con la URL real del Static Site.
2. Esperar el redeploy del backend.
3. Probar `https://<backend>.onrender.com/` y verificar que responda JSON.
4. Probar login con `cliente@libreria.test` / `Cliente1234`.
5. Consultar el catálogo y realizar un CRUD con el rol correspondiente.
6. Refrescar directamente `/catalogo` y `/libros/<id>` para verificar el
   rewrite del Static Site.

No se debe subir ningún `.env`, contraseña de Neon ni `JWT_SECRET` al
repositorio.
