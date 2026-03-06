const fs = require('fs');

// 1. UPDATE index.css
let css = fs.readFileSync('index.css', 'utf-8');

const rootVars = `:root {
    --primary-bg: #f8fafc;
    --secondary-bg: #ffffff;
    --accent: #2563eb;
    --accent-glow: rgba(37, 99, 235, 0.3);
    --text-main: #0f172a;
    --text-muted: #64748b;
    --glass: rgba(255, 255, 255, 1);
    --glass-border: rgba(0, 0, 0, 0.1);
    --header-bg: #0f172a;
    --header-text: #ffffff;
    --header-bg-scrolled: rgba(15, 23, 42, 0.95);
    --logo-accent: #38bdf8;
    --hero-h1-bg: #ffffff;
    --hero-h1-color: #ffffff;
    --hero-subtitle-color: #e2e8f0;
    --input-bg: rgba(255, 255, 255, 1);
    --card-bg: #ffffff;
    --modal-overlay: rgba(15, 23, 42, 0.8);
    --modal-bg: #ffffff;
    --image-container-bg: #f8fafc;
    --catalog-overlay-top: rgba(255, 255, 255, 0.9);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="dark"] {
    --primary-bg: #0a0b10;
    --secondary-bg: #161821;
    --accent: #00f2ff;
    --accent-glow: rgba(0, 242, 255, 0.3);
    --text-main: #e0e0e0;
    --text-muted: #a0a0a0;
    --glass: rgba(25, 27, 35, 0.85);
    --glass-border: rgba(255, 255, 255, 0.08);
    --header-bg: rgba(10, 11, 16, 0.8);
    --header-text: #e0e0e0;
    --header-bg-scrolled: rgba(10, 11, 16, 0.95);
    --logo-accent: #00f2ff;
    --hero-h1-bg: linear-gradient(to bottom, #fff, #888);
    --hero-h1-color: transparent;
    --hero-subtitle-color: #a0a0a0;
    --input-bg: rgba(255, 255, 255, 0.05);
    --card-bg: #12141c;
    --modal-overlay: rgba(0, 0, 0, 0.96);
    --modal-bg: #0a0b10;
    --image-container-bg: #0d0f17;
    --catalog-overlay-top: rgba(10, 11, 16, 0.8);
}`;

css = css.replace(/:root\s*\{.*?\}(?=\s*\* \{)/s, rootVars + '\n\n');

css = css.replace(/background:\s*rgba\(255, 255, 255, 1\);/g, 'background: var(--glass);');
css = css.replace(/header\.scrolled\s*\{[\s\S]*?background:\s*rgba\(15, 23, 42, 0\.95\);/g, 'header.scrolled {\n    background: var(--header-bg-scrolled);');
css = css.replace(/\.logo span\s*\{[\s\S]*?color:\s*#38bdf8;/g, '.logo span {\n    color: var(--logo-accent);');
css = css.replace(/\.hero-content h1\s*\{[\s\S]*?background:\s*#ffffff;\s*color:\s*#ffffff;/g, '.hero-content h1 {\n    background: var(--hero-h1-bg);\n    color: var(--hero-h1-color);');
css = css.replace(/\.hero-subtitle\s*\{[\s\S]*?color:\s*#e2e8f0;/g, '.hero-subtitle {\n    color: var(--hero-subtitle-color);');
css = css.replace(/\.search-input-wrapper input\s*\{[\s\S]*?background:\s*var\(--glass\);/g, '.search-input-wrapper input {\n    width: 100%;\n    height: 60px;\n    padding: 0 4.5rem 0 1.5rem;\n    background: var(--input-bg);');
css = css.replace(/\.search-input-wrapper input\s*\{[\s\S]*?background:\s*rgba\(255, 255, 255, 1\);/g, '.search-input-wrapper input {\n    width: 100%;\n    height: 60px;\n    padding: 0 4.5rem 0 1.5rem;\n    background: var(--input-bg);');
css = css.replace(/\.equipment-card,\s*\.result-card\s*\{[\s\S]*?background:\s*#ffffff;/g, '.equipment-card,\n.result-card {\n    padding: 2.5rem;\n    background: var(--card-bg);');
css = css.replace(/\.search-results-overlay\s*\{[\s\S]*?background:\s*#ffffff;/g, '.search-results-overlay {\n    margin-top: 2rem;\n    width: 100%;\n    max-width: 800px;\n    margin-left: auto;\n    margin-right: auto;\n    max-height: 400px;\n    overflow-y: auto;\n    padding: 1rem;\n    border-radius: 20px;\n    background: var(--card-bg);');
css = css.replace(/\.modal-overlay\s*\{[\s\S]*?background:\s*rgba\(15, 23, 42, 0\.8\);/g, '.modal-overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: var(--modal-overlay);');
css = css.replace(/\.modal-content\s*\{[\s\S]*?background:\s*#ffffff;/g, '.modal-content {\n    width: 95%;\n    max-width: 900px;\n    max-height: 90vh;\n    padding: 2.5rem;\n    overflow-y: auto;\n    position: relative;\n    transform: translateY(20px);\n    transition: transform 0.3s ease-out;\n    border-radius: 30px;\n    background: var(--modal-bg);');
css = css.replace(/\.equipment-image-container\s*\{[\s\S]*?background:\s*#f8fafc;/g, '.equipment-image-container {\n    margin-top: 1.2rem;\n    border-radius: 14px;\n    overflow: hidden;\n    border: 1px solid var(--glass-border);\n    background: var(--image-container-bg);');
css = css.replace(/\.spec-img-container\s*\{[\s\S]*?background:\s*#f8fafc;/g, '.spec-img-container {\n    margin-top: 0.5rem;\n    border-radius: 12px;\n    overflow: hidden;\n    border: 1px solid var(--glass-border);\n    background: var(--image-container-bg);');
css = css.replace(/\.catalog-overlay\s*\{[\s\S]*?background:\s*linear-gradient\(to bottom, rgba\(255, 255, 255, 0\.9\), var\(--primary-bg\)\);/g, '.catalog-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(to bottom, var(--catalog-overlay-top), var(--primary-bg));');
css = css.replace(/\.main-category-card\s*\{[\s\S]*?background:\s*#ffffff;/g, '.main-category-card {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    text-align: center;\n    padding: 4rem 2rem;\n    background: var(--card-bg);');

if (!css.includes('.theme-toggle')) {
    css += `\n/* Estilos para el botón de cambio de tema */
.theme-toggle {
    background: transparent;
    border: none;
    color: var(--header-text);
    font-size: 1.4rem;
    cursor: pointer;
    transition: var(--transition);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.theme-toggle:hover {
    color: var(--accent);
    transform: rotate(15deg) scale(1.1);
}
`;
}
fs.writeFileSync('index.css', css);

// 2. UPDATE index.html
let html = fs.readFileSync('index.html', 'utf-8');
if (!html.includes('id="theme-toggle"')) {
    html = html.replace('<nav>', `<nav>
                <button id="theme-toggle" class="theme-toggle" aria-label="Cambiar tema">
                    <i class="fas fa-moon"></i>
                </button>`);
    fs.writeFileSync('index.html', html);
}

// 3. UPDATE script.js
let js = fs.readFileSync('script.js', 'utf-8');
if (!js.includes('themeToggle')) {
    const toggleLogic = `
    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = themeToggle.querySelector('i');
    
    // Check local storage or match media
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

`;
    js = js.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {" + toggleLogic);
    fs.writeFileSync('script.js', js);
}
console.log('Dark mode applied');
