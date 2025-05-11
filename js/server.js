const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());

// Endpoint 1: Estado de los servicios
app.get("/api/servicios", (req, res) => {
  res.json([
    { nombre: "EC2", estado: "Investigando" },
    { nombre: "S3", estado: "Activo" },
    { nombre: "RDS", estado: "Resuelto" },
    { nombre: "Lambda", estado: "Activo" },
  ]);
});

// Endpoint 2: Métricas generales para los gráficos
app.get("/api/metricas", (req, res) => {
  res.json({
    uptimePromedio: "99.9%",
    mttr: "1h 45m",
    eventosCriticos: 2,
    historicoIncidentes: [3, 4, 2, 5, 3, 6, 4],
    fechas: [
      "31 jul",
      "25 sep",
      "12 jul",
      "14 ago",
      "17 jul",
      "28 sep",
      "21 sep",
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Servidor mock corriendo en http://localhost:${PORT}`);
});
