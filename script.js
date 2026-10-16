
document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       01. ELEMENTOS PRINCIPALES
    ========================================================= */
    const headerWeb = document.getElementById("header");
    const botonMenuWeb = document.getElementById("botonMenuWeb");
    const menuWeb = document.getElementById("menuWeb");
    const menuWebOverlay = document.getElementById("menuWebOverlay");
    const enlacesMenu = document.querySelectorAll(".menu-web-link");
    const secciones = document.querySelectorAll("section");
    const whatsapp = document.querySelector(".whatsapp");
    const videoHero = document.getElementById("heroVideo");
    const tarjetas = document.querySelectorAll(
        ".corporate-card, .value-card, .service, .process-card, .fleet-card, .benefits-grid > div, .contact-grid > div"
    );
    const movimientoReducido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    /* =========================================================
       02. HEADER AL HACER SCROLL
    ========================================================= */
    function actualizarHeader() {
        if (!headerWeb) return;
        headerWeb.classList.toggle("scrolled", window.scrollY > 60);
    }

    actualizarHeader();

    window.addEventListener("scroll", actualizarHeader, {
        passive: true
    });

    /* =========================================================
       03. MENÚ HAMBURGUESA
    ========================================================= */
    function abrirMenu() {
        if (!menuWeb || !botonMenuWeb) return;

        menuWeb.classList.add("menu-abierto");
        botonMenuWeb.classList.add("active");
        menuWebOverlay?.classList.add("activo");

        botonMenuWeb.setAttribute("aria-expanded", "true");
        botonMenuWeb.setAttribute("aria-label", "Cerrar menú");

        document.body.style.overflow = "hidden";
    }

    function cerrarMenu() {
        if (!menuWeb || !botonMenuWeb) return;

        menuWeb.classList.remove("menu-abierto");
        botonMenuWeb.classList.remove("active");
        menuWebOverlay?.classList.remove("activo");

        botonMenuWeb.setAttribute("aria-expanded", "false");
        botonMenuWeb.setAttribute("aria-label", "Abrir menú");

        document.body.style.overflow = "";
    }

    function alternarMenu() {
        if (!menuWeb) return;

        if (menuWeb.classList.contains("menu-abierto")) {
            cerrarMenu();
        } else {
            abrirMenu();
        }
    }

    botonMenuWeb?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        alternarMenu();
    });

    menuWebOverlay?.addEventListener("click", cerrarMenu);

    menuWeb?.querySelectorAll("a").forEach(enlace => {
        enlace.addEventListener("click", cerrarMenu);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") cerrarMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1000) cerrarMenu();
    });

    /* =========================================================
       04. DESPLAZAMIENTO SUAVE
    ========================================================= */
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener("click", (e) => {
            const href = enlace.getAttribute("href");

            if (!href || href === "#") return;

            const destino = document.getElementById(href.slice(1));

            if (!destino) return;

            e.preventDefault();
            cerrarMenu();

            destino.scrollIntoView({
                behavior: movimientoReducido.matches ? "auto" : "smooth",
                block: "start"
            });

            if (window.location.hash !== href) {
                history.pushState(null, "", href);
            }
        });
    });

    /* =========================================================
       05. OPCIÓN ACTIVA DEL MENÚ
    ========================================================= */
    function actualizarMenuActivo() {
        const posicion = window.scrollY + 160;
        let seccionActual = "inicio";

        secciones.forEach(seccion => {
            if (posicion >= seccion.offsetTop) {
                seccionActual = seccion.id || seccionActual;
            }
        });

        const idsMenu = Array.from(enlacesMenu)
            .map(enlace => enlace.getAttribute("href"))
            .filter(href => href && href.startsWith("#"));

        if (!idsMenu.includes("#" + seccionActual)) {
            const seccionesAnteriores = Array.from(secciones)
                .filter(seccion => seccion.offsetTop <= posicion)
                .reverse();

            const coincidencia = seccionesAnteriores.find(seccion =>
                idsMenu.includes("#" + seccion.id)
            );

            if (coincidencia) {
                seccionActual = coincidencia.id;
            }
        }

        enlacesMenu.forEach(enlace => {
            const activo =
                enlace.getAttribute("href") === "#" + seccionActual;

            enlace.classList.toggle("active", activo);

            if (activo) {
                enlace.setAttribute("aria-current", "location");
            } else {
                enlace.removeAttribute("aria-current");
            }
        });
    }

    actualizarMenuActivo();

    window.addEventListener("scroll", actualizarMenuActivo, {
        passive: true
    });

    /* =========================================================
       06. ANIMACIÓN DE TODAS LAS SECCIONES
    ========================================================= */
    function mostrarSeccion(seccion) {
        seccion.classList.add("show");
    }

    if ("IntersectionObserver" in window && !movimientoReducido.matches) {
        const observadorSecciones = new IntersectionObserver(
            (entradas, observador) => {
                entradas.forEach(entrada => {
                    if (entrada.isIntersecting) {
                        mostrarSeccion(entrada.target);
                        observador.unobserve(entrada.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px 60px 0px"
            }
        );

        secciones.forEach(seccion => {
            if (!seccion.classList.contains("hero")) {
                observadorSecciones.observe(seccion);
            }
        });
    } else {
        secciones.forEach(mostrarSeccion);
    }

    /* =========================================================
       07. ANIMACIÓN UNIFICADA DE TARJETAS
    ========================================================= */
    const permiteHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    );

    tarjetas.forEach(tarjeta => {
        tarjeta.style.willChange = "auto";

        if (!permiteHover.matches || movimientoReducido.matches) {
            return;
        }

        tarjeta.addEventListener("mouseenter", () => {
            tarjeta.style.willChange = "transform";
        });

        tarjeta.addEventListener("mouseleave", () => {
            tarjeta.style.willChange = "auto";
        });
    });

    /* =========================================================
       08. EFECTO VISUAL UNIFICADO DE TARJETAS
    ========================================================= */
    if (permiteHover.matches && !movimientoReducido.matches) {
        tarjetas.forEach(tarjeta => {
            tarjeta.addEventListener("mousemove", (e) => {
                const rect = tarjeta.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                tarjeta.style.backgroundImage =
                    `radial-gradient(circle at ${x}px ${y}px,
                    rgba(255, 140, 0, 0.055),
                    rgba(255, 255, 255, 0) 65%)`;
            });

            tarjeta.addEventListener("mouseleave", () => {
                tarjeta.style.backgroundImage = "";
            });
        });
    }

    /* =========================================================
       09. WHATSAPP
    ========================================================= */
    function actualizarWhatsapp() {
        if (!whatsapp) return;

        const visible = window.scrollY > 500;

        whatsapp.style.opacity = visible ? "1" : "0";
        whatsapp.style.transform = visible ? "scale(1)" : "scale(.8)";
        whatsapp.style.pointerEvents = visible ? "auto" : "none";
    }

    actualizarWhatsapp();

    window.addEventListener("scroll", actualizarWhatsapp, {
        passive: true
    });

    /* =========================================================
       10. VIDEO DE PORTADA
    ========================================================= */
    const videos = [
        "style/av/camion.mp4",
        "style/av/camion2.mp4"
    ];

    let videoActual = 0;

    if (videoHero) {
        videoHero.loop = false;
        videoHero.muted = true;
        videoHero.playsInline = true;

        videoHero.addEventListener("ended", () => {
            videoActual = (videoActual + 1) % videos.length;

            videoHero.src = videos[videoActual];
            videoHero.load();

            videoHero.play().catch(() => {});
        });

        videoHero.addEventListener("error", () => {
            console.warn("No se pudo cargar el video:", videoHero.currentSrc);
        });

        videoHero.play().catch(() => {});
    }

    /* =========================================================
       11. ACTUALIZACIÓN GENERAL DE PÁGINA
    ========================================================= */
    let scrollPendiente = false;

    function actualizarPagina() {
        actualizarHeader();
        actualizarMenuActivo();
        actualizarWhatsapp();
        scrollPendiente = false;
    }

    window.addEventListener("scroll", () => {
        if (!scrollPendiente) {
            scrollPendiente = true;
            requestAnimationFrame(actualizarPagina);
        }
    }, { passive: true });

    window.addEventListener("resize", () => {
        actualizarPagina();
    });

    /* =========================================================
       12. PÁGINA CARGADA
    ========================================================= */
    function paginaCargada() {
        document.body.classList.add("loaded");
        actualizarPagina();
    }

    if (document.readyState === "complete") {
        paginaCargada();
    } else {
        window.addEventListener("load", paginaCargada, {
            once: true
        });
    }

});
