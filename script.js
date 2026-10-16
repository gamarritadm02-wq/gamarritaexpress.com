document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTOS PRINCIPALES
    ===================================================== */

    const headerWeb = document.getElementById("header");
    const botonMenuWeb = document.getElementById("botonMenuWeb");
    const menuWeb = document.getElementById("menuWeb");
    const menuWebOverlay = document.getElementById("menuWebOverlay");
    const enlacesMenu = document.querySelectorAll(".menu-web-link");
    const secciones = document.querySelectorAll("section");
    const whatsapp = document.querySelector(".whatsapp");
    const videoHero = document.getElementById("heroVideo");


    /* =====================================================
       02. HEADER AL HACER SCROLL
    ===================================================== */

    function actualizarHeader() {

        if (!headerWeb) return;

        headerWeb.classList.toggle(
            "scrolled",
            window.scrollY > 60
        );
    }

    actualizarHeader();

    window.addEventListener(
        "scroll",
        actualizarHeader,
        { passive: true }
    );


    /* =====================================================
       03. MENÚ HAMBURGUESA
    ===================================================== */

    function abrirMenu() {

        if (!menuWeb || !botonMenuWeb) return;

        menuWeb.classList.add("menu-abierto");
        botonMenuWeb.classList.add("active");

        if (menuWebOverlay) {
            menuWebOverlay.classList.add("activo");
        }

        botonMenuWeb.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.style.overflow = "hidden";
    }


    function cerrarMenu() {

        if (!menuWeb || !botonMenuWeb) return;

        menuWeb.classList.remove("menu-abierto");
        botonMenuWeb.classList.remove("active");

        if (menuWebOverlay) {
            menuWebOverlay.classList.remove("activo");
        }

        botonMenuWeb.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.style.overflow = "";
    }


    function alternarMenu() {

        if (!menuWeb) return;

        const estaAbierto =
            menuWeb.classList.contains("menu-abierto");

        if (estaAbierto) {
            cerrarMenu();
        } else {
            abrirMenu();
        }
    }


    /* BOTÓN HAMBURGUESA */

    if (botonMenuWeb) {

        botonMenuWeb.addEventListener(
            "click",
            (e) => {

                e.preventDefault();
                e.stopPropagation();

                alternarMenu();
            }
        );
    }


    /* CERRAR AL PRESIONAR EL FONDO */

    if (menuWebOverlay) {

        menuWebOverlay.addEventListener(
            "click",
            cerrarMenu
        );
    }


    /* CERRAR AL PRESIONAR UNA OPCIÓN */

    enlacesMenu.forEach(enlace => {

        enlace.addEventListener(
            "click",
            cerrarMenu
        );
    });


    /* CERRAR CON ESC */

    document.addEventListener(
        "keydown",
        (e) => {

            if (e.key === "Escape") {
                cerrarMenu();
            }
        }
    );


    /* CERRAR AL VOLVER A PANTALLA GRANDE */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 1000) {
                cerrarMenu();
            }
        }
    );


    /* =====================================================
       04. SCROLL SUAVE
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(enlace => {

            enlace.addEventListener(
                "click",
                function (e) {

                    const href =
                        this.getAttribute("href");

                    if (!href || href === "#") {
                        return;
                    }

                    const destino =
                        document.querySelector(href);

                    if (!destino) {
                        return;
                    }

                    e.preventDefault();

                    cerrarMenu();

                    destino.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            );
        });


    /* =====================================================
       05. OPCIÓN ACTIVA DEL MENÚ
    ===================================================== */

    function actualizarMenuActivo() {

        const posicion =
            window.scrollY + 150;

        let actual = "inicio";

        enlacesMenu.forEach(enlace => {

            const href =
                enlace.getAttribute("href");

            if (!href || !href.startsWith("#")) {
                return;
            }

            const seccion =
                document.querySelector(href);

            if (!seccion) {
                return;
            }

            if (posicion >= seccion.offsetTop) {
                actual = seccion.id;
            }
        });


        enlacesMenu.forEach(enlace => {

            enlace.classList.toggle(
                "active",
                enlace.getAttribute("href") ===
                "#" + actual
            );
        });
    }

    actualizarMenuActivo();

    window.addEventListener(
        "scroll",
        actualizarMenuActivo,
        { passive: true }
    );


    /* =====================================================
       06. MOSTRAR SECCIONES AL HACER SCROLL
    ===================================================== */

    function revelarSecciones() {

        const limite =
            window.innerHeight * 0.85;

        secciones.forEach(seccion => {

            const posicion =
                seccion.getBoundingClientRect().top;

            if (posicion < limite) {

                seccion.classList.add("show");
            }
        });
    }

    revelarSecciones();

    window.addEventListener(
        "scroll",
        revelarSecciones,
        { passive: true }
    );


    /* =====================================================
       07. WHATSAPP
    ===================================================== */

    function actualizarWhatsapp() {

        if (!whatsapp) return;

        if (window.scrollY > 500) {

            whatsapp.style.opacity = "1";
            whatsapp.style.transform = "scale(1)";

        } else {

            whatsapp.style.opacity = "0";
            whatsapp.style.transform = "scale(.8)";
        }
    }

    actualizarWhatsapp();

    window.addEventListener(
        "scroll",
        actualizarWhatsapp,
        { passive: true }
    );


    /* =====================================================
       08. EFECTO TARJETAS DE SERVICIOS
    ===================================================== */

    const tarjetasServicio =
        document.querySelectorAll(".service");

    tarjetasServicio.forEach(tarjeta => {

        tarjeta.addEventListener(
            "mousemove",
            (e) => {

                const rect =
                    tarjeta.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                tarjeta.style.background =
                    `radial-gradient(
                        circle at ${x}px ${y}px,
                        #ffffff,
                        #f5f7fb
                    )`;
            }
        );


        tarjeta.addEventListener(
            "mouseleave",
            () => {

                tarjeta.style.background = "#fff";
            }
        );
    });


    /* =====================================================
       09. VIDEO HERO
    ===================================================== */

    const videos = [
        "style/av/camion.mp4",
        "style/av/camion2.mp4"
    ];

    let videoActual = 0;

    if (videoHero) {

        /*
        IMPORTANTE:
        Para que cambie de camion.mp4 a camion2.mp4
        el elemento <video> NO debe tener el atributo loop.
        */

        videoHero.addEventListener(
            "ended",
            () => {

                videoActual++;

                if (videoActual >= videos.length) {
                    videoActual = 0;
                }

                videoHero.src =
                    videos[videoActual];

                videoHero.load();

                videoHero.play().catch(() => {});
            }
        );
    }


    /* =====================================================
       10. PÁGINA CARGADA
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add("loaded");
        }
    );

});
