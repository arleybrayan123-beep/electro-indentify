const fs = require('fs');

const svgTemplate = (title, lines) => {
    let textElements = lines.map((line, i) => {
        const y = 80 + (i * 30);
        const color = line.color || "#aaaaaa";
        const size = line.size || "16";
        const weight = line.bold ? "bold" : "normal";
        return `<text x="50%" y="${y}" fill="${color}" font-family="sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="middle">${line.text}</text>`;
    }).join('');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">
  <rect width="100%" height="100%" fill="#0d0f17" rx="15" ry="15"/>
  <rect x="2" y="2" width="396" height="246" fill="none" stroke="#00f2ff" stroke-width="2" rx="15" ry="15" opacity="0.3"/>
  <text x="50%" y="40" fill="#00f2ff" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">${title}</text>
  <line x1="50" y1="55" x2="350" y2="55" stroke="#00f2ff" stroke-width="1" opacity="0.5"/>
  ${textElements}
</svg>`;

    // Convert to data URI
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};

// SVG Definitions for each capacitor
const svgs = {
    cer_ref: svgTemplate("Lectura Capacitor Cerámico", [
        { text: "Ejemplo de Código: 104", color: "#ffffff", size: "18", bold: true },
        { text: "1º Dígito: 1" },
        { text: "2º Dígito: 0" },
        { text: "3º Dígito (Multiplicador): 0000" },
        { text: "Resultado: 100,000 pF", color: "#00ffaa", bold: true },
        { text: "Equivalencia: 100 nF = 0.1 µF", color: "#00ffaa", bold: true }
    ]),
    elec_ref: svgTemplate("Polaridad: Electrolítico", [
        { text: "Símbolo Técnico:  + |[ --  -", color: "#ffffff" },
        { text: "Identificación Física:", color: "#00f2ff", size: "18", bold: true },
        { text: "1. Franja lateral gris/blanca indica Negativo (-)" },
        { text: "2. Terminal (pata) más corta es Negativo (-)" },
        { text: "3. Terminal (pata) más larga es Positivo (+)" },
        { text: "¡ATENCIÓN! Invertirlo puede causar explosión", color: "#ff4444", bold: true }
    ]),
    tan_ref: svgTemplate("Polaridad: Tantalio", [
        { text: "Símbolo Técnico:  + |[ --  -", color: "#ffffff" },
        { text: "Identificación Física:", color: "#00f2ff", size: "18", bold: true },
        { text: "1. Posee una banda o raya en un extremo" },
        { text: "2. La banda indica el polo POSITIVO (+)", color: "#00ffaa", bold: true },
        { text: "3. A diferencia del electrolítico de aluminio" },
        { text: "Muy sensibles a inversión de polaridad", color: "#ff4444" }
    ]),
    poly_ref: svgTemplate("Lectura Capacitor Poliéster", [
        { text: "Ejemplo: 473 J 100V", color: "#ffffff", size: "18", bold: true },
        { text: "Valor: 47 × 10³ pF = 47,000 pF (47 nF)" },
        { text: "Tolerancia (J): ±5%", color: "#00ffaa" },
        { text: "(K = ±10%, M = ±20%)", size: "14" },
        { text: "Voltaje Máximo: 100V (Corriente Continua)" },
        { text: "No tiene polaridad", color: "#00f2ff", bold: true }
    ]),
    mica_ref: svgTemplate("Datos: Capacitor de Mica", [
        { text: "Características Principales", color: "#00f2ff", size: "18", bold: true },
        { text: "Dieléctrico: Mica natural (mineral)" },
        { text: "Alta Precisión: Tolerancias de ±1% a ±5%", color: "#00ffaa" },
        { text: "Uso: Osciladores y Radiofrecuencia (RF)" },
        { text: "Código: Impreso en pF o puntos de color" },
        { text: "No polarizado - Soporta altos voltajes" }
    ]),
    super_ref: svgTemplate("Datos: Supercapacitor (EDLC)", [
        { text: "Características Principales", color: "#00f2ff", size: "18", bold: true },
        { text: "Capacitancia Extrema: Medida en Faradios (F)", color: "#00ffaa" },
        { text: "Capacidad típica: 1F hasta 3000F" },
        { text: "Voltaje Máx: Muy bajo (típicamente 2.7V)", color: "#ff4444" },
        { text: "Uso: Respaldo de memoria, UPS en miniatura" },
        { text: "¡ATENCIÓN! Componente Polarizado (+/-)" }
    ]),
    var_ref: svgTemplate("Datos: Capacitor Variable", [
        { text: "Símbolo con flecha diagonal", color: "#ffffff" },
        { text: "Ajuste de Capacitancia", color: "#00f2ff", size: "18", bold: true },
        { text: "Rango típico: Trimmers de 2pF a 60pF" },
        { text: "Uso: Sintonización de Radios AM/FM" },
        { text: "Ajuste: Girar tornillo superior suavemente" },
        { text: "Se usa destornillador cerámico/plástico", color: "#00ffaa" }
    ])
};

// Simple placeholder logic for the primary images if they also fail
const mainImageSvg = (label) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
  <rect width="100%" height="100%" fill="#12141c" />
  <circle cx="150" cy="150" r="80" fill="none" stroke="#00f2ff" stroke-width="4" opacity="0.5" stroke-dasharray="10 5"/>
  <text x="50%" y="140" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="bold" text-anchor="middle">IMAGEN</text>
  <text x="50%" y="170" fill="#00f2ff" font-family="sans-serif" font-size="20" text-anchor="middle">${label}</text>
  <text x="50%" y="270" fill="#666" font-family="sans-serif" font-size="12" text-anchor="middle">Desconectado de Amazon/Wiki</text>
</svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
};

const scriptPath = 'script.js';
let content = fs.readFileSync(scriptPath, 'utf8');

// Replace referential images
content = content.replace(/"Referencia Visual": ".*cap_cer_tabla.*"/g, `"Referencia Visual": "${svgs.cer_ref}"`);
content = content.replace(/"Tabla de Código": ".*Mylar_capacitor_codes.*"/g, `"Tabla de Código": "${svgs.poly_ref}"`); // using poly ref for ceramic alternative table if needed

content = content.replace(/"Referencia Visual": ".*Capacitor_electrolytic_polarity.*"/g, `"Referencia Visual": "${svgs.elec_ref}"`);
content = content.replace(/"Referencia Visual": ".*8aa5d2c77df51fb264cacf43bd64d509.*"/g, `"Referencia Visual": "${svgs.elec_ref}"`);

content = content.replace(/"Referencia Visual": ".*TantalumCapacitorSymbol.*"/g, `"Referencia Visual": "${svgs.tan_ref}"`);
content = content.replace(/"Referencia Visual": ".*article165-2019-12-16-17-06-25-303.*"/g, `"Referencia Visual": "${svgs.tan_ref}"`);

content = content.replace(/"Referencia Visual": ".*Polyester_film_capacitor.*"/g, `"Referencia Visual": "${svgs.poly_ref}"`);
content = content.replace(/"Referencia Visual": ".*Capacitor-codes-all-1.*"/g, `"Referencia Visual": "${svgs.poly_ref}"`);

content = content.replace(/"Referencia Visual": ".*CondensadorMica_2.*"/g, `"Referencia Visual": "${svgs.mica_ref}"`);
content = content.replace(/"Referencia Visual": ".*Mica_capacitor.*"/g, `"Referencia Visual": "${svgs.mica_ref}"`);

content = content.replace(/"Referencia Visual": ".*Supercapacitor_diagram.*"/g, `"Referencia Visual": "${svgs.super_ref}"`);
content = content.replace(/"Referencia Visual": ".*Supercapacitor-construction-y-structure.*"/g, `"Referencia Visual": "${svgs.super_ref}"`);

content = content.replace(/"Referencia Visual": ".*Variable_capacitor_symbol.*"/g, `"Referencia Visual": "${svgs.var_ref}"`);
content = content.replace(/"Referencia Visual": ".*Bc547_variable_condenser.*"/g, `"Referencia Visual": "${svgs.var_ref}"`);


// Also replace the Main Images that are 404ing (Amazon links)
content = content.replace(/imageUrl: ".*51A1i2-e6-L.*"/g, `imageUrl: "${mainImageSvg("Cerámico")}"`);
content = content.replace(/imageUrl: ".*61J2m0C6-OL.*"/g, `imageUrl: "${mainImageSvg("Electrolítico")}"`);
content = content.replace(/imageUrl: ".*41D8zD5fP9L.*"/g, `imageUrl: "${mainImageSvg("Tantalio")}"`);
content = content.replace(/imageUrl: ".*61P1YInmE-L.*"/g, `imageUrl: "${mainImageSvg("Poliéster")}"`);
content = content.replace(/imageUrl: ".*51fTf9m-E9L.*"/g, `imageUrl: "${mainImageSvg("Mica")}"`);
content = content.replace(/imageUrl: ".*61C2lAt3qPL.*"/g, `imageUrl: "${mainImageSvg("Supercapacitor")}"`);
content = content.replace(/imageUrl: ".*61S6hUoO8iL.*"/g, `imageUrl: "${mainImageSvg("Variable")}"`);

fs.writeFileSync(scriptPath, content);
console.log("script.js updated with SVG data URIs successfully.");
