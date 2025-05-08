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
    case "Resuelto":
      return "rojo";
    default:
      return "gris";
  }
}

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
