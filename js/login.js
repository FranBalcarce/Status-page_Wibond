document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  // Login simulado
  if (email === "admin@wibond.com" && pass === "123456") {
    localStorage.setItem("logueado", "true");
    window.location.href = "index.html";
  } else {
    document.getElementById("error").classList.remove("oculto");
  }
});

// ✅ Configuración de AWS Cognito (reemplazar con tus datos)
// const { Amplify, Auth } = window.aws_amplify;

// Amplify.configure({
//   Auth: {
//     region: 'us-east-1', // 🌎 REEMPLAZAR con la región de tu User Pool (ej: us-east-1)
// userPoolId: 'us-east-1_ABC123XYZ', // 🧩 REEMPLAZAR con tu User Pool ID
// userPoolWebClientId: 'abc123clientid456def789', // 🧩 REEMPLAZAR con tu App Client ID
//   }
// });

// 🎯 Función principal de login
// document.getElementById("loginForm").addEventListener("submit", async function (e) {
//   e.preventDefault();
//   const email = document.getElementById("email").value;
//   const pass = document.getElementById("password").value;

//   try {
//     const user = await Auth.signIn(email, pass);
//     console.log("Login exitoso:", user);
//     localStorage.setItem("logueado", "true");
//     window.location.href = "index.html";
//   } catch (err) {
//     console.error("Error al iniciar sesión:", err);
//     document.getElementById("error").classList.remove("oculto");
//   }
// });

// 🧼 Mejora de UX: Oculta el mensaje de error si vuelve a escribir
// document.getElementById("email").addEventListener("input", ocultarError);
// document.getElementById("password").addEventListener("input", ocultarError);

// function ocultarError() {
//   document.getElementById("error").classList.add("oculto");
// }
