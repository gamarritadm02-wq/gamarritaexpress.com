/*=========================
      HEADER SCROLL
==========================*/

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 60){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});


/*=========================
    SCROLL REVEAL
==========================*/

const sections = document.querySelectorAll("section");

const reveal = () =>{

    const trigger = window.innerHeight * 0.85;

    sections.forEach(section=>{

        const top = section.getBoundingClientRect().top;

        if(top < trigger){

            section.classList.add("show");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();


/*=========================
   BOTONES SUAVES
==========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const destino=document.querySelector(this.getAttribute("href"));

        destino.scrollIntoView({

            behavior:"smooth"

        });

    });

});


/*=========================
     EFECTO HERO
==========================*/

window.addEventListener("scroll",()=>{

    const hero=document.querySelector(".hero");

    hero.style.backgroundPositionY=(window.scrollY*0.35)+"px";

});


/*=========================
    BOTON WHATSAPP
==========================*/

const whatsapp=document.querySelector(".whatsapp");

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        whatsapp.style.opacity="1";

        whatsapp.style.transform="scale(1)";

    }else{

        whatsapp.style.opacity="0";

        whatsapp.style.transform="scale(.8)";

    }

});


/*=========================
     EFECTO TARJETAS
==========================*/

const cards=document.querySelectorAll(".service");

cards.forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

        const x=e.offsetX;
        const y=e.offsetY;

        card.style.background=
        `radial-gradient(circle at ${x}px ${y}px,#ffffff,#f5f7fb)`;

    });

    card.addEventListener("mouseleave",()=>{

        card.style.background="#fff";

    });

});


/*=========================
    CARGA PAGINA
==========================*/

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});

const video = document.getElementById("heroVideo");

const videos = [
    "camion.mp4",
    "camion2.mp4"
];

let videoActual = 0;

video.addEventListener("ended", function(){

    videoActual++;

    if(videoActual >= videos.length){

        videoActual = 0;

    }

    video.src = videos[videoActual];

    video.play();

});
