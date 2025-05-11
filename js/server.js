// Archivo: server.js
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

// Endpoint 3: Uptime detallado por servicio (para las barras de colores)
app.get("/api/uptime", (req, res) => {
  res.json({
    servicios: [
      {
        nombre: "B24",
        estadoActual: "Operational",
        uptime: "99.94%",
        historial: [
          "verde",
          "verde",
          "verde",
          "amarillo",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
        ],
      },
      {
        nombre: "APIBANCO",
        estadoActual: "Operational",
        uptime: "99.89%",
        historial: [
          "verde",
          "verde",
          "rojo",
          "amarillo",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
        ],
      },
      {
        nombre: "Reporteria",
        estadoActual: "Operational",
        uptime: "99.49%",
        historial: [
          "rojo",
          "rojo",
          "verde",
          "verde",
          "verde",
          "amarillo",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
          "verde",
        ],
      },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`Servidor mock corriendo en http://localhost:${PORT}`);
});

// -----------------------------
// Código del lado del cliente:
// -----------------------------

// Obtener y mostrar servicios
fetch("http://localhost:3000/api/servicios")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("servicios");
    data.forEach((servicio) => {
      const div = document.createElement("div");
      div.className = "servicio";
      div.innerHTML = `<h4>${servicio.nombre}</h4><p>${servicio.estado}</p>`;
      container.appendChild(div);
    });
  });

// Obtener y mostrar métricas
fetch("http://localhost:3000/api/metricas")
  .then((res) => res.json())
  .then((data) => {
    document.querySelector(".card:nth-child(1) p").textContent =
      data.uptimePromedio;
    document.querySelector(".card:nth-child(2) p").textContent = data.mttr;
    document.querySelector(".card:nth-child(3) p").textContent =
      data.eventosCriticos;

    if (window.lineChart) {
      lineChart.data.labels = data.fechas;
      lineChart.data.datasets[0].data = data.historicoIncidentes;
      lineChart.update();
    }
  });

// Obtener y mostrar el uptime por servicio como barras de estado
fetch("http://localhost:3000/api/uptime")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("uptime-servicios");
    if (!container) return;

    data.servicios.forEach((servicio) => {
      const div = document.createElement("div");
      div.className = "servicio-uptime";
      div.innerHTML = `
        <h4>${servicio.nombre}</h4>
        <div class="health-bar">
          ${servicio.historial
            .map((color) => `<div class="bar ${color}"></div>`)
            .join("")}
        </div>
        <p>${servicio.uptime} uptime - <span class="estado">${
        servicio.estadoActual
      }</span></p>
      `;
      container.appendChild(div);
    });
  });
