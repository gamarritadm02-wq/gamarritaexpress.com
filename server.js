//Browserless API Token: https://www.browserless.io/?utm_source=chatgpt.com
//Cloudflare Workers.: https://dash.cloudflare.com/sign-up?utm_source=chatgpt.com

//CODIGO PARA UN UNICO LINK CON UN VEHICULO DETERMINADO

export default {
  async fetch(request, env) {

    const ditrackUrl =
      "https://ditrack.pe/t/qkf2SXu8xLGvrJ2b3Z6cr0bPztkFRbPRIPAYP_AVrOg";

    const browserlessUrl =
      "https://production-sfo.browserless.io/function?token=" +
      env.BROWSERLESS_TOKEN;

    const codigo = `
      export default async ({ page }) => {

        await page.goto("${ditrackUrl}", {
          waitUntil: "domcontentloaded",
          timeout: 30000
        });

        await new Promise(resolve => setTimeout(resolve, 5000));

        const resultado = await page.evaluate(async () => {

          const respuesta = await fetch(
            window.location.pathname + "/position",
            {
              method: "GET",
              credentials: "same-origin"
            }
          );

          if (!respuesta.ok) {
            throw new Error(
              "Error al consultar la posición: " +
              respuesta.status
            );
          }

          const datos = await respuesta.json();

          return {
            vehiculo: "BKL-812",
            estado: datos.online ? "Online" : "Offline",
            ultimaActualizacion: datos.last_update_label,
            velocidad: datos.speed_label,
            latitud: datos.latitude,
            longitud: datos.longitude,
            rumbo: datos.heading,
            evento: datos.heading === null
              ? "Sin rumbo disponible"
              : "Movimiento"
          };

        });

        return resultado;
      };
    `;

    const respuesta = await fetch(browserlessUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/javascript"
      },
      body: codigo
    });

    const resultado = await respuesta.text();

    return new Response(resultado, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      }
    });

  }
};


//CODIGO PARA UN UNICO LINK CON UN VEHICULO DETERMINADO
