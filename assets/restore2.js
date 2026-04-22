const fs = require('fs');

let css = fs.readFileSync('index.css', 'utf-8');

const missingCss = `
#landing-page,
#catalog-page {
    transition: opacity 0.5s ease;
}

.hidden-page {
    display: none;
    opacity: 0;
}

.btn-back {
    background: var(--primary-bg);
    color: var(--text-muted);
    padding: 0.8rem 1.8rem;
    border-radius: 50px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    margin-bottom: 2rem;
    font-family: inherit;
    font-weight: 600;
}

.btn-back:hover {
    color: var(--accent);
    border-color: transparent;
    transform: translateX(-5px);
    box-shadow: 0 0 20px var(--accent-glow);
}

.catalog-header {
    text-align: center;
    margin-bottom: 4rem;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate {
    animation: fadeInUp 0.8s ease forwards;
}

@media (max-width: 768px) {
    h1 {
        font-size: 2.5rem;
    }

    .modal-body {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .hero-subtitle {
        font-size: 1.1rem;
    }

    .container {
        padding: 4rem 1.5rem;
    }

    .equipment-grid {
        grid-template-columns: 1fr;
    }

    .modal-content {
        padding: 2rem 1.5rem;
    }
}

/* =============================================
   CORRECCIONES RESPONSIVAS AVANZADAS PARA MOVIL
   ============================================= */
@media (max-width: 768px) {
    .modal-overlay {
        align-items: flex-start;
        padding: 0.75rem;
    }

    .modal-content {
        padding: 1.5rem;
        max-height: 92vh;
        border-radius: 20px;
        margin: auto;
    }

    .modal-body {
        gap: 1.5rem;
    }

    .specs-section h2 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
    }

    .usage-list {
        margin-top: 0.8rem;
    }

    .usage-list li {
        font-size: 0.9rem;
        margin-bottom: 0.6rem;
    }

    .btn-video {
        padding: 0.7rem 1.2rem;
        font-size: 0.9rem;
        margin-top: 1rem;
    }

    .close-modal {
        top: 0.8rem;
        right: 0.8rem;
        font-size: 2rem;
    }
}

/* =============================================
   IMAGEN DE EQUIPO EN MODAL
   ============================================= */
.equipment-image-container {
    margin-top: 1.2rem;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--glass-border);
    background: var(--image-container-bg);
    display: flex;
    align-items: center;
    justify-content: center;
}

.equipment-image {
    width: 100%;
    height: 230px;
    object-fit: contain;
    display: block;
    padding: 0.5rem;
    filter: drop-shadow(0 0 12px var(--accent-glow));
    transition: transform 0.3s ease;
}

.equipment-image:hover {
    transform: scale(1.03);
}

/* --- Estilos para la Nueva Navegación de Categorías --- */

.main-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
    max-width: 900px;
    margin: 0 auto;
}

.main-category-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 4rem 2rem;
    background: var(--card-bg);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.main-category-card i {
    font-size: 3.5rem;
    margin-bottom: 2rem;
    color: var(--accent);
    filter: drop-shadow(0 0 10px var(--accent-glow));
}

.main-category-card h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--text-main);
}

.main-category-card p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: var(--text-muted);
}

.subcategory-count {
    background: var(--accent);
    color: #ffffff;
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    box-shadow: 0 4px 15px var(--accent-glow);
}

.spec-link {
    color: var(--accent);
    text-decoration: none;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.spec-link:hover {
    text-shadow: 0 0 10px var(--accent-glow);
    transform: translateX(5px);
}

.spec-item-full {
    grid-column: 1 / -1;
    border-bottom: 1px solid var(--glass-border);
}

.equipment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

`;

if (!css.includes('.hidden-page')) {
    css += '\\n' + missingCss;
    fs.writeFileSync('index.css', css, 'utf-8');
    console.log("Missing CSS appended to EOF!");
} else {
    console.log("CSS already has .hidden-page");
}
