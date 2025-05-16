// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Animación para el eslogan (Tagline) ---
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        const phrases = [
            originalText,
            "Calidad y durabilidad en cada abertura.",
            "Diseños modernos para tu hogar.",
            "Presupuestos a tu medida.",
            "Instalación profesional garantizada."
        ];
        let currentPhraseIndex = 0;
        tagline.style.transition = 'opacity 0.5s ease-in-out';

        setInterval(() => {
            tagline.style.opacity = '0';
            setTimeout(() => {
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                tagline.textContent = phrases[currentPhraseIndex];
                tagline.style.opacity = '1';
            }, 500); // Tiempo para que se desvanezca antes de cambiar el texto
        }, 4000); // Cambia cada 4 segundos
    }

    // --- 2. Modal para las imágenes de los productos ---
    const productImages = document.querySelectorAll('.product-details img, .product-details a[target="_blank"]');
    let modal = null; // Para mantener una referencia al modal

    function createModal() {
        if (document.getElementById('imageModal')) return document.getElementById('imageModal');

        const modalDiv = document.createElement('div');
        modalDiv.id = 'imageModal';
        modalDiv.style.display = 'none';
        modalDiv.style.position = 'fixed';
        modalDiv.style.zIndex = '1000';
        modalDiv.style.left = '0';
        modalDiv.style.top = '0';
        modalDiv.style.width = '100%';
        modalDiv.style.height = '100%';
        modalDiv.style.overflow = 'auto';
        modalDiv.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modalDiv.style.justifyContent = 'center';
        modalDiv.style.alignItems = 'center';

        const modalImg = document.createElement('img');
        modalImg.id = 'modalImageContent';
        modalImg.style.margin = 'auto';
        modalImg.style.display = 'block';
        modalImg.style.maxWidth = '80%';
        modalImg.style.maxHeight = '80%';
        modalImg.style.borderRadius = '8px';

        const closeSpan = document.createElement('span');
        closeSpan.id = 'closeModal';
        closeSpan.innerHTML = '&times;';
        closeSpan.style.position = 'absolute';
        closeSpan.style.top = '20px';
        closeSpan.style.right = '35px';
        closeSpan.style.color = '#f1f1f1';
        closeSpan.style.fontSize = '40px';
        closeSpan.style.fontWeight = 'bold';
        closeSpan.style.cursor = 'pointer';

        modalDiv.appendChild(closeSpan);
        modalDiv.appendChild(modalImg);
        document.body.appendChild(modalDiv);

        closeSpan.onclick = () => {
            modalDiv.style.display = 'none';
        }
        modalDiv.onclick = (event) => {
            if (event.target === modalDiv) { // Cierra si se hace clic fuera de la imagen
                modalDiv.style.display = 'none';
            }
        }
        return modalDiv;
    }

    modal = createModal(); // Crear el modal una vez

    productImages.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Previene la navegación si es un enlace
            const modalImgContent = document.getElementById('modalImageContent');
            let imgSrc;

            if (event.target.tagName === 'IMG') {
                imgSrc = event.target.src;
            } else if (event.target.tagName === 'A') {
                imgSrc = event.target.href;
            }

            if (imgSrc && modal) {
                modalImgContent.src = imgSrc;
                modal.style.display = 'flex'; // Cambiado a flex para centrar
            }
        });
    });

    // --- 3. Resaltar precios al pasar el mouse ---
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        price.style.transition = 'transform 0.3s ease, color 0.3s ease';
        price.addEventListener('mouseenter', () => {
            price.style.transform = 'scale(1.05)';
            price.style.color = '#e67e22'; // Un color naranja para resaltar
        });
        price.addEventListener('mouseleave', () => {
            price.style.transform = 'scale(1)';
            price.style.color = '#28a745'; // Vuelve al color original (verde)
        });
    });

    // --- 4. Efecto "hover" en los materiales ---
    const materialItems = document.querySelectorAll('.materials ul li, .materials ol li');
    materialItems.forEach(item => {
        item.style.transition = 'background-color 0.3s ease, padding-left 0.3s ease';
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#e9ecef'; // Un fondo claro al pasar el mouse
            item.style.paddingLeft = '2rem'; // Indentación leve
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
            item.style.paddingLeft = '1.5rem'; // Vuelve a la indentación original
        });
    });

    // --- 5. Botón "Volver Arriba" ---
    let backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '&#9650; <span class="tooltiptext">Subir</span>'; // Flecha hacia arriba
    backToTopButton.id = 'backToTopBtn';
    // Estilos para el botón (puedes moverlos a tu CSS)
    backToTopButton.style.display = 'none';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '30px';
    backToTopButton.style.right = '30px';
    backToTopButton.style.zIndex = '999';
    backToTopButton.style.border = 'none';
    backToTopButton.style.outline = 'none';
    backToTopButton.style.backgroundColor = '#007bff';
    backToTopButton.style.color = 'white';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.padding = '10px 15px';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.fontSize = '18px';
    backToTopButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    backToTopButton.style.transition = 'opacity 0.3s, visibility 0.3s, background-color 0.3s';

    // Tooltip (texto emergente) para el botón "Volver Arriba"
    const tooltipStyle = `
        #backToTopBtn .tooltiptext {
            visibility: hidden;
            width: 60px;
            background-color: #555;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px 0;
            position: absolute;
            z-index: 1;
            bottom: 125%; /* Posicionar el tooltip arriba del botón */
            left: 50%;
            margin-left: -30px; /* Usar la mitad del width para centrar */
            opacity: 0;
            transition: opacity 0.3s;
            font-size: 12px;
        }
        #backToTopBtn:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = tooltipStyle;
    document.head.appendChild(styleSheet);


    document.body.appendChild(backToTopButton);

    window.onscroll = () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.style.display = 'block';
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
            // Esperar a que termine la transición para ocultarlo completamente
            setTimeout(() => {
                if (!(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)) {
                     backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    };

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.style.backgroundColor = '#0056b3';
    });
    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.style.backgroundColor = '#007bff';
    });


    // --- 6. Mensaje de bienvenida en la consola ---
    console.log('%cAberturas Mateo_ | ¡Bienvenido a la consola! 🛠️', 'color: #007bff; font-size: 16px; font-weight: bold;');
    console.log('Si tienes alguna sugerencia o encuentras un error, ¡no dudes en contactarnos!');

    // --- 7. Efecto de "carga" o "aparición" suave para las secciones ---
    const sections = document.querySelectorAll('main section');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% de la sección visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        sectionObserver.observe(section);
    });

});