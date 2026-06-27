document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. SOLUCIÓN AL MENÚ HAMBURGUESA (MÓVIL)
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const icon = menuToggle.querySelector('i');

    // Abre y cierra el menú al tocar el botón
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Efecto visual: Cambia las 3 rayitas por una 'X' al abrirlo
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cierra el menú automáticamente cuando el usuario elige una opción
    const navLinks = document.querySelectorAll('.nav-menu li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* ==========================================================================
       2. SOLUCIÓN AL BUCLE INFINITO DE WHATSAPP
       ========================================================================== */
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    if(whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            // Detenemos el comportamiento problemático por defecto del navegador
            e.preventDefault(); 
            const url = this.getAttribute('href');
            
            // Obligamos al navegador a abrirlo en una ventana totalmente limpia
            // Así, cuando le des "atrás" en el celular, volverás a la página exacta donde estabas.
            window.open(url, '_blank', 'noopener,noreferrer');
        });
    }

    /* ==========================================================================
       3. DARLE VIDA: EFECTO EN LA BARRA DE NAVEGACIÓN AL BAJAR
       ========================================================================== */
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        // Cuando bajas más de 50 píxeles, la barra se hace un poquito más delgada y la sombra más fuerte
        if (window.scrollY > 50) {
            header.style.padding = '8px 0';
            header.style.boxShadow = '0 4px 25px rgba(0,0,0,0.1)';
        } else {
            // Vuelve a su estado original al subir hasta el tope
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
    });

    /* ==========================================================================
       4. DARLE VIDA: APARICIÓN SUAVE DE LOS ELEMENTOS (FADE-IN)
       ========================================================================== */
    // Configuramos un observador que "vigila" cuándo un elemento entra en la pantalla
    const observerOptions = {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando aparece en pantalla, le aplicamos la animación
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // Dejamos de observarlo para que no se repita
            }
        });
    }, observerOptions);

    // Seleccionamos qué elementos queremos que tengan este efecto mágico
    const elementsToAnimate = document.querySelectorAll('.luxury-card, .section-header, .about-col');
    
    elementsToAnimate.forEach(element => {
        // Estado inicial (oculto y ligeramente desplazado hacia abajo)
        element.style.opacity = "0";
        element.style.transform = "translateY(40px)";
        element.style.transition = "opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)";
        
        // Empezamos a observarlo
        observer.observe(element);
    });

});
// ==========================================================================
// SOLUCIÓN AL BUG DE REDIRECCIÓN DE FACEBOOK
// ==========================================================================
document.addEventListener("DOMContentLoaded", function() {
    // Buscamos el enlace de Facebook usando su atributo aria-label
    const fbLink = document.querySelector('a[aria-label="Facebook"]');
    
    if (fbLink) {
        fbLink.addEventListener("click", function(e) {
            // 1. Evitamos que el HTML actúe de forma normal
            e.preventDefault(); 
            
            // 2. Guardamos la URL de destino
            const url = this.getAttribute("href");
            
            // 3. Abrimos una pestaña completamente nueva y aislada usando JS
            const nuevaPestana = window.open(url, '_blank', 'noopener,noreferrer');
            
            // 4. Medida de seguridad extra por si el navegador bloquea ventanas emergentes
            if (nuevaPestana) {
                nuevaPestana.focus();
            } else {
                // Si falla, redirige de forma limpia sin romper el historial
                window.location.assign(url);
            }
        });
    }
});

