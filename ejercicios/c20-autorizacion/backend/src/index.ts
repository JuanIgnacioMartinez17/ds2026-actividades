import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: [process.env.FRONTEND_URL ?? "http://localhost:5173"],
};

app.use(cors(corsOptions)); // 1º, ANTES de json() y de las rutas
app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ message: "Hello World! Backend funcionando 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);

app.use((_req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});