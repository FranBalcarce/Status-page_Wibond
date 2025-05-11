// Chequeo de sesión simulada
if (localStorage.getItem("logueado") !== "true") {
  window.location.href = "login.html";
}

function logout() {
  localStorage.removeItem("logueado");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/servicios.json")
    .then((res) => res.json())
    .then((data) => renderServicios(data));
});

function renderServicios(servicios) {
  const contenedor = document.getElementById("servicios");
  contenedor.innerHTML = "";
  servicios.forEach((servicio) => {
    const colorClass = getColorClass(servicio.estado);
    const card = `
        <div class="card">
          <h3>${servicio.nombre}</h3>
          <p>Estado: <span class="estado ${colorClass}">${servicio.estado}</span></p>
        </div>
      `;
    contenedor.innerHTML += card;
  });
}

function getColorClass(estado) {
  switch (estado) {
    case "Activo":
      return "verde";
    case "Investigando":
      return "amarillo";
    case "Error":
      return "rojo";
    default:
      return "gris";
  }
}

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

    // Actualizar gráfico de línea con datos reales
    if (window.lineChart) {
      lineChart.data.labels = data.fechas;
      lineChart.data.datasets[0].data = data.historicoIncidentes;
      lineChart.update();
    }
  });

// --------------------------------------------------------------------------------------------------------------------
// Para actualizarlo cuando tengamos una API, vamos a tener que cambiar el fetch por esto fetch('https://api.wibond.dev/status')

// --------------------------------------------------------------------------------------------------------------------
// Para posibles errores usar esto: fetch('https://api.wibond.dev/status')
// .then(res => {
//   if (!res.ok) throw new Error('Error al obtener datos');
//   return res.json();
// })
// .then(data => renderServicios(data))
// .catch(error => {
//   console.error('Error al conectar con la API:', error);
//   document.getElementById("servicios").innerHTML = "<p>Error al cargar el estado de los servicios.</p>";
// });

// --------------------------------------------------------------------------------------------------------------------
// Para que se actualice cada tantos segundos esto: function cargarServicios() {
//     fetch('https://api.wibond.dev/status')
//       .then(res => {
//         if (!res.ok) throw new Error('Error al obtener datos');
//         return res.json();
//       })
//       .then(data => renderServicios(data))
//       .catch(error => {
//         console.error('Error al conectar con la API:', error);
//       });
//   }

//   function renderServicios(servicios) {
//     const contenedor = document.getElementById("servicios");
//     contenedor.innerHTML = ''; // limpiamos antes de renderizar de nuevo
//     servicios.forEach(servicio => {
//       const colorClass = getColorClass(servicio.estado);
//       const card = `
//         <div class="card">
//           <h3>${servicio.nombre}</h3>
//           <p>Estado: <span class="estado ${colorClass}">${servicio.estado}</span></p>
//         </div>
//       `;
//       contenedor.innerHTML += card;
//     });
//   }

//   setInterval(cargarServicios, 30000); // cada 30 segundos
//   cargarServicios(); // ejecuta la primera vez

// --------------------------------------------------------------------------------------------------------------------
//   Si la API necesita un token: fetch('https://api.wibond.dev/status', {
//     headers: {
//       'Authorization': 'Bearer TU_TOKEN'
//     }
//   })

// --------------------------------------------------------------------------------------------------------------------
